/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clientId]` on the table `Seller` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Client_userId_key` ON `Client`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `Seller_clientId_key` ON `Seller`(`clientId`);
