-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema protected_docs
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema protected_docs
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `protected_docs` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `protected_docs` ;

-- -----------------------------------------------------
-- Table `protected_docs`.`Rooms`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `protected_docs`.`Rooms` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `room_name` VARCHAR(255) NOT NULL,
  `password` VARCHAR(2048) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `room_name_UNIQUE` (`room_name` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 40
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `protected_docs`.`Documents`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `protected_docs`.`Documents` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `room_id` INT NOT NULL,
  `title` VARCHAR(45) NOT NULL DEFAULT 'Untitled',
  `content` MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Room_Rooms_idx` (`room_id` ASC) VISIBLE,
  CONSTRAINT `fk_documents_room`
    FOREIGN KEY (`room_id`)
    REFERENCES `protected_docs`.`Rooms` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 145
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
