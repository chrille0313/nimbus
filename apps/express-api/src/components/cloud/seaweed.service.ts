import { Filer, SeaweedFilerServer } from 'seaweedts/filer';

export class SeaweedService {
  private filer = new SeaweedFilerServer();

  private getCloudPath(ownerId: string, cloudId: string, subPath?: string): string {
    return `clouds/${ownerId}/${cloudId}${subPath ?? ''}`;
  }

  private isDirectory(metadata: Filer.Types.DirectoryMetadata | Filer.Types.FileMetadata): boolean {
    return !('chunks' in metadata);
  }

  private getFilePath(cloudId: string, fullPath: string): string {
    const cloudIdStartIndex = fullPath.indexOf(cloudId);
    const cloudIdEndIndex = cloudIdStartIndex + cloudId.length;
    return fullPath.slice(cloudIdEndIndex);
  }

  private getFileName(fullPath: string) {
    return fullPath.split('/').pop();
  }

  async getFiles(ownerId: string, cloudId: string, path?: string) {
    const storagePath = this.getCloudPath(ownerId, cloudId, path);
    const files = await this.filer.listFiles(storagePath, {});

    const filesDTO = files.map((file) => ({
      name: this.getFileName(file.FullPath),
      path: this.getFilePath(cloudId, file.FullPath),
      createdAt: file.Crtime,
      updatedAt: file.Mtime,
      ...(this.isDirectory(file)
        ? {
            type: 'directory'
          }
        : {
            //@ts-expect-error: Typescript doesn't know that the file is a FileMetadata here
            size: file.FileSize,
            type: 'file'
          })
    }));

    return filesDTO;
  }

  async createCloud(ownerId: string, cloudId: string): Promise<void> {
    this.filer.send(
      {
        file: Buffer.from([]),
        filename: '',
        path: `${this.getCloudPath(ownerId, cloudId, '/')}`
      },
      {}
    );
  }

  async deleteCloud(ownerId: string, cloudId: string): Promise<void> {
    const path = this.getCloudPath(ownerId, cloudId);
    await this.filer.deleteFile(path, {
      recursive: true
    });
  }

  async uploadFileToCloud(
    ownerId: string,
    cloudId: string,
    path: string,
    file: Express.Multer.File
  ): Promise<void> {
    this.filer.send(
      {
        file: file.buffer,
        filename: file.originalname,
        path: this.getCloudPath(ownerId, cloudId, `${path}/${file.originalname}`)
      },
      {}
    );
  }

  async uploadFilesToCloud(
    ownerId: string,
    cloudId: string,
    rootDir: string,
    files: Express.Multer.File[]
  ): Promise<void> {
    files.forEach((file) => {
      this.uploadFileToCloud(ownerId, cloudId, rootDir, file);
    });
  }
}
