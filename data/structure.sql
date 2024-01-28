create database if not exists `teamcode`;

use `teamcode`;

create table if not exists `users` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `username` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `firstname` varchar(255) DEFAULT NULL,
    `lastname` varchar(255) DEFAULT NULL,
    `email` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
);

create table if not exists `team` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `creatorId` bigint NOT NULL,
    `name` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
);

create table if not exists `shared-ids` (
    `teamId` bigint NOT NULL,
    `uId` bigint NOT NULL
);

create table if not exists `project` (
    `id` bigint NOT NULL AUTO_INCREMENT,
    `teamId` bigint NOT NULL,
    `creatorId` bigint NOT NULL,
    `title` varchar(255) NOT NULL,
    `text` varchar(255) NOT NULL,
    PRIMARY KEY (`id`)
);