CREATE TABLE `booked_dates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`date` varchar(10) NOT NULL,
	`note` text,
	`createdBy` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `booked_dates_id` PRIMARY KEY(`id`),
	CONSTRAINT `booked_dates_date_unique` UNIQUE(`date`)
);
--> statement-breakpoint
ALTER TABLE `booked_dates` ADD CONSTRAINT `booked_dates_createdBy_users_id_fk` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;