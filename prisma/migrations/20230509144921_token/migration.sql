-- CreateTable
CREATE TABLE "token" (
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "toLogin" BOOLEAN NOT NULL DEFAULT false
);

-- CreateIndex
CREATE UNIQUE INDEX "token_email_key" ON "token"("email");

-- CreateIndex
CREATE UNIQUE INDEX "token_phone_key" ON "token"("phone");
