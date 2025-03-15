import prisma from '@repo/database';

describe("Test config", () => {
    it("counts correctly", ()=>{
      expect(1 + 1).toBe(2);
      console.log(prisma);
    })
  })