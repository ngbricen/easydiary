USE tyqyc0s23aq7w7io;
SELECT * from diaries;

-- SELECT `id`, `name`, `email`, `password_hash`, `createdAt`, `updatedAt` 
-- FROM `Users` AS `User` 
-- WHERE `User`.`email` = 'bricen@gmail.com' AND `User`.`password_hash` = 'test' LIMIT 1
-- ALTER TABLE Users AUTO_INCREMENT = 1;
-- INSERT INTO Users(name,email,password_hash, createdAt, updatedAt) VALUES ('Brice','bricen@gmail.com','test', current_date(),current_date());
-- INSERT INTO Users(name,email,password_hash, createdAt, updatedAt) VALUES ('Bob','bricen@hotmail.com','test1', current_date(),current_date());
-- DELETE FROM Users WHERE id >= 2
SELECT `User`.`id`, `User`.`name`, `User`.`email`, `User`.`password_hash`, `User`.`createdAt`, `User`.`updatedAt`, `Diaries`.`id` 
AS `Diaries.id`, `Diaries`.`title` AS `Diaries.title`, `Diaries`.`body` 
AS `Diaries.body`, `Diaries`.`isPublic` AS `Diaries.isPublic`, `Diaries`.`createdAt` 
AS `Diaries.createdAt`, `Diaries`.`updatedAt` AS `Diaries.updatedAt`, `Diaries`.`UserId` 
AS `Diaries.UserId` FROM `Users` AS `User` 
LEFT OUTER JOIN `Diaries` AS `Diaries` 
ON `User`.`id` = `Diaries`.`UserId` WHERE `User`.`id` = '1';