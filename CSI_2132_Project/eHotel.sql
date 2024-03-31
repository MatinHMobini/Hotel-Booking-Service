Create table Hotel_Chain (
	chain_name varchar(45),
	central_address varchar(45),
	email_addresses varchar(45),
	phone_numbers varchar(45),
	number_of_hotels int,
		primary key(chain_name, central_address)
);


create table Hotel (
	hotel_id int,
	address varchar(45),
	category int not null CHECK (category >= 0 AND category <= 5),
	number_of_rooms int not null CHECK (category >= 0 AND category <= 999),
	email_address varchar(45),
	phone_number varchar(45),
		primary key(hotel_id, address)
);


CREATE TABLE owns (
    chain_name VARCHAR(45),
    central_address VARCHAR(45),
    hotel_id INT,
    hotel_address VARCHAR(45),
    PRIMARY KEY (chain_name, central_address, hotel_id, hotel_address),
    FOREIGN KEY (chain_name, central_address) REFERENCES Hotel_Chain (chain_name, central_address) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (hotel_id, hotel_address) REFERENCES Hotel (hotel_id, address) ON DELETE CASCADE ON UPDATE CASCADE
);


create table employee (
	employee_sin int,
	employee_name varchar(45),
	employee_address varchar(45),
	e_role varchar(45),
	hotel_id int,
	hotel_address varchar(45),
		primary key(employee_sin),
		foreign key(hotel_id, hotel_address) REFERENCES Hotel (hotel_id, address) ON DELETE CASCADE ON UPDATE CASCADE
);

create table renting_archive (
	renting_id int,
	cust_id int,
	room_id int,
	checkin_date varchar(45),
	checkout_date varchar(45),
		primary key(renting_id)
);

create table booking_archive (
	booking_id int,
	cust_id int,
	room_id int,
	booking_date varchar(45),
		primary key(booking_id)
);

create table room (
	room_number int,
	room_id int,
	price int,
	booking_id int,
	hotel_address varchar(45),
	hotel_id int,
	amenities varchar(45),
	capacity int,
	view_type varchar(45),
	can_extend boolean,
	damages varchar(45),
		primary key(room_id),
		foreign key(hotel_address, hotel_id) references Hotel(address, hotel_id) ON DELETE CASCADE ON UPDATE CASCADE,
		foreign key(booking_id) references booking(booking_id) ON DELETE CASCADE ON UPDATE CASCADE
);


--alter table room 
	--add column hotel_id int references Hotel(hotel_id) ON DELETE CASCADE ON UPDATE CASCADE;
	

create table composed_of (
	room_id int,
	hotel_id int,
	address varchar(45),
		primary key(room_id,hotel_id,address),
		foreign key(room_id) references room (room_id) ON DELETE CASCADE ON UPDATE CASCADE,
		foreign key(hotel_id, address) references Hotel (hotel_id, address) ON DELETE CASCADE ON UPDATE CASCADE
);

create table booking (
	booking_id int,
	room_id int,
	booking_date varchar(45),
		primary key(booking_id),
		foreign key(room_id) references room(room_id) ON DELETE CASCADE ON UPDATE CASCADE	
);

alter table room
	add column booking_id int references booking(booking_id) ON DELETE CASCADE ON UPDATE CASCADE;
		
create table customer(
	customer_id int,
	customer_name varchar(45),
	customer_address varchar(45),
	registration_date varchar(45),
	booking_id int,
	room_id int,
		primary key(customer_id),
		foreign key(booking_id) references booking(booking_id) ON DELETE CASCADE ON UPDATE CASCADE,
		foreign key(room_id) references room(room_id) ON DELETE CASCADE ON UPDATE CASCADE
);

alter table booking
	add column customer_id int references customer(customer_id) ON DELETE CASCADE ON UPDATE CASCADE;


create table creates(
	booking_id int,
	customer_id int,
		primary key(booking_id,customer_id),
		foreign key(customer_id) references customer(customer_id) ON DELETE CASCADE ON UPDATE CASCADE,
		foreign key(booking_id) references booking(booking_id) ON DELETE CASCADE ON UPDATE CASCADE
);	


create table renting(
	renting_id int,
	customer_id int,
	room_id int,
	checkin_date varchar(45),
	checkout_date varchar(45),
		primary key(renting_id),
		foreign key(room_id) references room(room_id) ON DELETE CASCADE ON UPDATE CASCADE,
		foreign key(customer_id) references customer(customer_id) ON DELETE CASCADE ON UPDATE CASCADE
);


create table non_booking_checkin(--when doing this, the employee makes a booking then transfers that into a renting
	booking_id int,
	renting_id int,
	has_paid boolean,
		primary key(booking_id, renting_id),
		foreign key(booking_id) references booking(booking_id) ON DELETE CASCADE ON UPDATE CASCADE,
		foreign key(renting_id) references renting(renting_id) ON DELETE CASCADE ON UPDATE CASCADE
);


create table checkin(
	booking_id int,
	renting_id int,
	has_paid boolean,
		primary key(booking_id, renting_id),
		foreign key(booking_id) references booking(booking_id) ON DELETE CASCADE ON UPDATE CASCADE,
		foreign key(renting_id) references renting(renting_id) ON DELETE CASCADE ON UPDATE CASCADE
);


create table occupies(
	room_id int,
	renting_id int,
		primary key(room_id, renting_id),
		foreign key(room_id) references room(room_id) ON DELETE CASCADE ON UPDATE CASCADE,
		foreign key(renting_id) references renting(renting_id) ON DELETE CASCADE ON UPDATE CASCADE
);


create table has_a(
	customer_id int,
	renting_id int,
		primary key(customer_id, renting_id),
		foreign key(customer_id) references customer(customer_id) ON DELETE CASCADE ON UPDATE CASCADE,
		foreign key(renting_id) references renting(renting_id) ON DELETE CASCADE ON UPDATE CASCADE
);

create table reserves(
	booking_id int,
	room_id int,
		primary key(booking_id,room_id),
		foreign key(room_id) references room(room_id) ON DELETE CASCADE ON UPDATE CASCADE,
		foreign key(booking_id) references booking(booking_id) ON DELETE CASCADE ON UPDATE CASCADE
);



CREATE OR REPLACE FUNCTION insert_booking_archive()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO booking_archive (booking_id, cust_id, room_id, booking_date)
    VALUES (NEW.booking_id, NEW.customer_id, NEW.room_id, NEW.booking_date);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER insert_booking_archive_trigger
	AFTER INSERT ON booking
	FOR EACH ROW EXECUTE FUNCTION insert_booking_archive();



CREATE OR REPLACE FUNCTION insert_renting_archive()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO renting_archive (renting_id, cust_id, room_id, checkin_date, checkout_date)
    VALUES (NEW.renting_id, NEW.customer_id, NEW.room_id, NEW.checkin_date, NEW.checkout_date);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER insert_renting_archive_trigger
AFTER INSERT ON renting
FOR EACH ROW EXECUTE FUNCTION insert_renting_archive();




-- Insert data for Hotel_Chain table
INSERT INTO Hotel_Chain (chain_name, central_address, email_addresses, phone_numbers, number_of_hotels)
VALUES
('Chain1', 'Toronto', 'chain1@example.com', '123-456-7890', 8),
('Chain2', 'Vancouver', 'chain2@example.com', '123-456-7891', 8),
('Chain3', 'Ottawa', 'chain3@example.com', '123-456-7892', 8),
('Chain4', 'Toronto', 'chain4@example.com', '123-456-7893', 8),
('Chain5', 'Vancouver', 'chain5@example.com', '123-456-7894', 8);

-- Insert data for Hotel table
INSERT INTO Hotel (hotel_id, address, category, number_of_rooms, email_address, phone_number)
VALUES
-- Hotels for Chain1
(1, 'Address1', 3, 100, 'hotel1@example.com', '111-222-3333'),
(2, 'Address2', 4, 120, 'hotel2@example.com', '222-333-4444'),
(3, 'Address3', 3, 110, 'hotel3@example.com', '333-444-5555'),
(4, 'Address4', 4, 130, 'hotel4@example.com', '444-555-6666'),
(5, 'Address5', 5, 140, 'hotel5@example.com', '555-666-7777'),
(6, 'Address6', 3, 120, 'hotel6@example.com', '666-777-8888'),
(7, 'Address7', 4, 130, 'hotel7@example.com', '777-888-9999'),
(8, 'Address8', 5, 150, 'hotel8@example.com', '888-999-0000'),

-- Hotels for Chain2
(9, 'Address9', 3, 125, 'hotel9@example.com', '999-000-1111'),
(10, 'Address10', 4, 135, 'hotel10@example.com', '000-111-2222'),
(11, 'Address11', 3, 115, 'hotel11@example.com', '111-222-3333'),
(12, 'Address12', 4, 125, 'hotel12@example.com', '222-333-4444'),
(13, 'Address13', 5, 145, 'hotel13@example.com', '333-444-5555'),
(14, 'Address14', 3, 115, 'hotel14@example.com', '444-555-6666'),
(15, 'Address15', 4, 125, 'hotel15@example.com', '555-666-7777'),
(16, 'Address16', 5, 135, 'hotel16@example.com', '666-777-8888'),

-- Hotels for Chain3
(17, 'Address17', 3, 120, 'hotel17@example.com', '777-888-9999'),
(18, 'Address18', 4, 130, 'hotel18@example.com', '888-999-0000'),
(19, 'Address19', 3, 110, 'hotel19@example.com', '999-000-1111'),
(20, 'Address20', 4, 120, 'hotel20@example.com', '000-111-2222'),
(21, 'Address21', 5, 140, 'hotel21@example.com', '111-222-3333'),
(22, 'Address22', 3, 120, 'hotel22@example.com', '222-333-4444'),
(23, 'Address23', 4, 130, 'hotel23@example.com', '333-444-5555'),
(24, 'Address24', 5, 150, 'hotel24@example.com', '444-555-6666'),

-- Hotels for Chain4
(25, 'Address25', 3, 115, 'hotel25@example.com', '555-666-7777'),
(26, 'Address26', 4, 125, 'hotel26@example.com', '666-777-8888'),
(27, 'Address27', 3, 105, 'hotel27@example.com', '777-888-9999'),
(28, 'Address28', 4, 115, 'hotel28@example.com', '888-999-0000'),
(29, 'Address29', 5, 135, 'hotel29@example.com', '999-000-1111'),
(30, 'Address30', 3, 115, 'hotel30@example.com', '000-111-2222'),
(31, 'Address31', 4, 125, 'hotel31@example.com', '111-222-3333'),
(32, 'Address32', 5, 135, 'hotel32@example.com', '222-333-4444'),

-- Hotels for Chain5
(33, 'Address33', 3, 110, 'hotel33@example.com', '333-444-5555'),
(34, 'Address34', 4, 120, 'hotel34@example.com', '444-555-6666'),
(35, 'Address35', 3, 100, 'hotel35@example.com', '555-666-7777'),
(36, 'Address36', 4, 110, 'hotel36@example.com', '666-777-8888'),
(37, 'Address37', 5, 130, 'hotel37@example.com', '777-888-9999'),
(38, 'Address38', 3, 110, 'hotel38@example.com', '888-999-0000'),
(39, 'Address39', 4, 120, 'hotel39@example.com', '999-000-1111'),
(40, 'Address40', 5, 140, 'hotel40@example.com', '000-111-2222');

-- Insert data for owns table
INSERT INTO owns (chain_name, central_address, hotel_id, hotel_address)
VALUES
-- Ownership relationships for Chain1
('Chain1', 'Toronto', 1, 'Address1'),
('Chain1', 'Toronto', 2, 'Address2'),
('Chain1', 'Toronto', 3, 'Address3'),
('Chain1', 'Toronto', 4, 'Address4'),
('Chain1', 'Toronto', 5, 'Address5'),
('Chain1', 'Toronto', 6, 'Address6'),
('Chain1', 'Toronto', 7, 'Address7'),
('Chain1', 'Toronto', 8, 'Address8'),

-- Ownership relationships for Chain2
('Chain2', 'Vancouver', 9, 'Address9'),
('Chain2', 'Vancouver', 10, 'Address10'),
('Chain2', 'Vancouver', 11, 'Address11'),
('Chain2', 'Vancouver', 12, 'Address12'),
('Chain2', 'Vancouver', 13, 'Address13'),
('Chain2', 'Vancouver', 14, 'Address14'),
('Chain2', 'Vancouver', 15, 'Address15'),
('Chain2', 'Vancouver', 16, 'Address16'),

-- Ownership relationships for Chain3
('Chain3', 'Ottawa', 17, 'Address17'),
('Chain3', 'Ottawa', 18, 'Address18'),
('Chain3', 'Ottawa', 19, 'Address19'),
('Chain3', 'Ottawa', 20, 'Address20'),
('Chain3', 'Ottawa', 21, 'Address21'),
('Chain3', 'Ottawa', 22, 'Address22'),
('Chain3', 'Ottawa', 23, 'Address23'),
('Chain3', 'Ottawa', 24, 'Address24'),

-- Ownership relationships for Chain4
('Chain4', 'Toronto', 25, 'Address25'),
('Chain4', 'Toronto', 26, 'Address26'),
('Chain4', 'Toronto', 27, 'Address27'),
('Chain4', 'Toronto', 28, 'Address28'),
('Chain4', 'Toronto', 29, 'Address29'),
('Chain4', 'Toronto', 30, 'Address30'),
('Chain4', 'Toronto', 31, 'Address31'),
('Chain4', 'Toronto', 32, 'Address32'),

-- Ownership relationships for Chain5
('Chain5', 'Vancouver', 33, 'Address33'),
('Chain5', 'Vancouver', 34, 'Address34'),
('Chain5', 'Vancouver', 35, 'Address35'),
('Chain5', 'Vancouver', 36, 'Address36'),
('Chain5', 'Vancouver', 37, 'Address37'),
('Chain5', 'Vancouver', 38, 'Address38'),
('Chain5', 'Vancouver', 39, 'Address39'),
('Chain5', 'Vancouver', 40, 'Address40');

-- Insert data for room table
INSERT INTO room (room_number, room_id, price, hotel_address, hotel_id, amenities, capacity, view_type, can_extend, damages)
VALUES
-- Rooms for Hotel1
(101, 1, 100, 'Address1', 1, 'WiFi, TV', 1, 'Sea', TRUE, NULL),
(102, 2, 110, 'Address1', 1, 'WiFi, TV', 2, 'Mountain', TRUE, NULL),
(103, 3, 120, 'Address1', 1, 'WiFi, TV', 3, 'Sea', TRUE, NULL),
(104, 4, 130, 'Address1', 1, 'WiFi, TV', 4, 'Mountain', TRUE, NULL),
(105, 5, 140, 'Address1', 1, 'WiFi, TV', 5, 'Sea', TRUE, NULL),

-- Rooms for Hotel2
(106, 6, 110, 'Address2', 2, 'WiFi, TV', 1, 'Mountain', TRUE, NULL),
(107, 7, 120, 'Address2', 2, 'WiFi, TV', 2, 'Sea', TRUE, NULL),
(108, 8, 130, 'Address2', 2, 'WiFi, TV', 3, 'Mountain', TRUE, NULL),
(109, 9, 140, 'Address2', 2, 'WiFi, TV', 4, 'Sea', TRUE, NULL),
(110, 10, 150, 'Address2', 2, 'WiFi, TV', 5, 'Mountain', TRUE, NULL),

-- Rooms for Hotel3
(111, 11, 120, 'Address3', 3, 'WiFi, TV', 1, 'Sea', TRUE, NULL),
(112, 12, 130, 'Address3', 3, 'WiFi, TV', 2, 'Mountain', TRUE, NULL),
(113, 13, 140, 'Address3', 3, 'WiFi, TV', 3, 'Sea', TRUE, NULL),
(114, 14, 150, 'Address3', 3, 'WiFi, TV', 4, 'Mountain', TRUE, NULL),
(115, 15, 160, 'Address3', 3, 'WiFi, TV', 5, 'Sea', TRUE, NULL),

-- Rooms for Hotel4
(116, 16, 130, 'Address4', 4, 'WiFi, TV', 1, 'Mountain', TRUE, NULL),
(117, 17, 140, 'Address4', 4, 'WiFi, TV', 2, 'Sea', TRUE, NULL),
(118, 18, 150, 'Address4', 4, 'WiFi, TV', 3, 'Mountain', TRUE, NULL),
(119, 19, 160, 'Address4', 4, 'WiFi, TV', 4, 'Sea', TRUE, NULL),
(120, 20, 170, 'Address4', 4, 'WiFi, TV', 5, 'Mountain', TRUE, NULL),

-- Rooms for Hotel5
(121, 21, 140, 'Address5', 5, 'WiFi, TV', 1, 'Sea', TRUE, NULL),
(122, 22, 150, 'Address5', 5, 'WiFi, TV', 2, 'Mountain', TRUE, NULL),
(123, 23, 160, 'Address5', 5, 'WiFi, TV', 3, 'Sea', TRUE, NULL),
(124, 24, 170, 'Address5', 5, 'WiFi, TV', 4, 'Mountain', TRUE, NULL),
(125, 25, 180, 'Address5', 5, 'WiFi, TV', 5, 'Sea', TRUE, NULL),

-- Rooms for Hotel6
(126, 26, 150, 'Address6', 6, 'WiFi, TV', 1, 'Mountain', TRUE, NULL),
(127, 27, 160, 'Address6', 6, 'WiFi, TV', 2, 'Sea', TRUE, NULL),
(128, 28, 170, 'Address6', 6, 'WiFi, TV', 3, 'Mountain', TRUE, NULL),
(129, 29, 180, 'Address6', 6, 'WiFi, TV', 4, 'Sea', TRUE, NULL),
(130, 30, 190, 'Address6', 6, 'WiFi, TV', 5, 'Mountain', TRUE, NULL),

-- Rooms for Hotel7
(131, 31, 160, 'Address7', 7, 'WiFi, TV', 1, 'Sea', TRUE, NULL),
(132, 32, 170, 'Address7', 7, 'WiFi, TV', 2, 'Mountain', TRUE, NULL),
(133, 33, 180, 'Address7', 7, 'WiFi, TV', 3, 'Sea', TRUE, NULL),
(134, 34, 190, 'Address7', 7, 'WiFi, TV', 4, 'Mountain', TRUE, NULL),
(135, 35, 200, 'Address7', 7, 'WiFi, TV', 5, 'Sea', TRUE, NULL),

-- Rooms for Hotel8
(136, 36, 170, 'Address8', 8, 'WiFi, TV', 1, 'Mountain', TRUE, NULL),
(137, 37, 180, 'Address8', 8, 'WiFi, TV', 2, 'Sea', TRUE, NULL),
(138, 38, 190, 'Address8', 8, 'WiFi, TV', 3, 'Mountain', TRUE, NULL),
(139, 39, 200, 'Address8', 8, 'WiFi, TV', 4, 'Sea', TRUE, NULL),
(140, 40, 210, 'Address8', 8, 'WiFi, TV', 5, 'Mountain', TRUE, NULL),

-- Rooms for Hotel9
(141, 41, 180, 'Address9', 9, 'WiFi, TV', 1, 'Sea', TRUE, NULL),
(142, 42, 190, 'Address9', 9, 'WiFi, TV', 2, 'Mountain', TRUE, NULL),
(143, 43, 200, 'Address9', 9, 'WiFi, TV', 3, 'Sea', TRUE, NULL),
(144, 44, 210, 'Address9', 9, 'WiFi, TV', 4, 'Mountain', TRUE, NULL),
(145, 45, 220, 'Address9', 9, 'WiFi, TV', 5, 'Sea', TRUE, NULL),

-- Rooms for Hotel10
(146, 46, 190, 'Address10', 10, 'WiFi, TV', 1, 'Mountain', TRUE, NULL),
(147, 47, 200, 'Address10', 10, 'WiFi, TV', 2, 'Sea', TRUE, NULL),
(148, 48, 210, 'Address10', 10, 'WiFi, TV', 3, 'Mountain', TRUE, NULL),
(149, 49, 220, 'Address10', 10, 'WiFi, TV', 4, 'Sea', TRUE, NULL),
(150, 50, 230, 'Address10', 10, 'WiFi, TV', 5, 'Mountain', TRUE, NULL),

-- Rooms for Hotel11
(151, 51, 200, 'Address11', 11, 'WiFi, TV', 1, 'Sea', TRUE, NULL),
(152, 52, 210, 'Address11', 11, 'WiFi, TV', 2, 'Mountain', TRUE, NULL),
(153, 53, 220, 'Address11', 11, 'WiFi, TV', 3, 'Sea', TRUE, NULL),
(154, 54, 230, 'Address11', 11, 'WiFi, TV', 4, 'Mountain', TRUE, NULL),
(155, 55, 240, 'Address11', 11, 'WiFi, TV', 5, 'Sea', TRUE, NULL),

-- Rooms for Hotel12
(156, 56, 210, 'Address12', 12, 'WiFi, TV', 1, 'Mountain', TRUE, NULL),
(157, 57, 220, 'Address12', 12, 'WiFi, TV', 2, 'Sea', TRUE, NULL),
(158, 58, 230, 'Address12', 12, 'WiFi, TV', 3, 'Mountain', TRUE, NULL),
(159, 59, 240, 'Address12', 12, 'WiFi, TV', 4, 'Sea', TRUE, NULL),
(160, 60, 250, 'Address12', 12, 'WiFi, TV', 5, 'Mountain', TRUE, NULL),

-- Rooms for Hotel13
(161, 61, 220, 'Address13', 13, 'WiFi, TV', 1, 'Sea', TRUE, NULL),
(162, 62, 230, 'Address13', 13, 'WiFi, TV', 2, 'Mountain', TRUE, NULL),
(163, 63, 240, 'Address13', 13, 'WiFi, TV', 3, 'Sea', TRUE, NULL),
(164, 64, 250, 'Address13', 13, 'WiFi, TV', 4, 'Mountain', TRUE, NULL),
(165, 65, 260, 'Address13', 13, 'WiFi, TV', 5, 'Sea', TRUE, NULL),

-- Rooms for Hotel14
(166, 66, 230, 'Address14', 14, 'WiFi, TV', 1, 'Mountain', TRUE, NULL),
(167, 67, 240, 'Address14', 14, 'WiFi, TV', 2, 'Sea', TRUE, NULL),
(168, 68, 250, 'Address14', 14, 'WiFi, TV', 3, 'Mountain', TRUE, NULL),
(169, 69, 260, 'Address14', 14, 'WiFi, TV', 4, 'Sea', TRUE, NULL),
(170, 70, 270, 'Address14', 14, 'WiFi, TV', 5, 'Mountain', TRUE, NULL),

-- Rooms for Hotel15
(171, 71, 240, 'Address15', 15, 'WiFi, TV', 1, 'Sea', TRUE, NULL),
(172, 72, 250, 'Address15', 15, 'WiFi, TV', 2, 'Mountain', TRUE, NULL),
(173, 73, 260, 'Address15', 15, 'WiFi, TV', 3, 'Sea', TRUE, NULL),
(174, 74, 270, 'Address15', 15, 'WiFi, TV', 4, 'Mountain', TRUE, NULL),
(175, 75, 280, 'Address15', 15, 'WiFi, TV', 5, 'Sea', TRUE, NULL),

-- Rooms for Hotel16
(176, 76, 250, 'Address16', 16, 'WiFi, TV', 1, 'Mountain', TRUE, NULL),
(177, 77, 260, 'Address16', 16, 'WiFi, TV', 2, 'Sea', TRUE, NULL),
(178, 78, 270, 'Address16', 16, 'WiFi, TV', 3, 'Mountain', TRUE, NULL),
(179, 79, 280, 'Address16', 16, 'WiFi, TV', 4, 'Sea', TRUE, NULL),
(180, 80, 290, 'Address16', 16, 'WiFi, TV', 5, 'Mountain', TRUE, NULL),

-- Rooms for Hotel17
(181, 81, 260, 'Address17', 17, 'WiFi, TV', 1, 'Sea', TRUE, NULL),
(182, 82, 270, 'Address17', 17, 'WiFi, TV', 2, 'Mountain', TRUE, NULL),
(183, 83, 280, 'Address17', 17, 'WiFi, TV', 3, 'Sea', TRUE, NULL),
(184, 84, 290, 'Address17', 17, 'WiFi, TV', 4, 'Mountain', TRUE, NULL),
(185, 85, 300, 'Address17', 17, 'WiFi, TV', 5, 'Sea', TRUE, NULL),

-- Rooms for Hotel18
(186, 86, 270, 'Address18', 18, 'WiFi, TV', 1, 'Mountain', TRUE, NULL),
(187, 87, 280, 'Address18', 18, 'WiFi, TV', 2, 'Sea', TRUE, NULL),
(188, 88, 290, 'Address18', 18, 'WiFi, TV', 3, 'Mountain', TRUE, NULL),
(189, 89, 300, 'Address18', 18, 'WiFi, TV', 4, 'Sea', TRUE, NULL),
(190, 90, 310, 'Address18', 18, 'WiFi, TV', 5, 'Mountain', TRUE, NULL),

-- Rooms for Hotel19
(191, 91, 280, 'Address19', 19, 'WiFi, TV', 1, 'Sea', TRUE, NULL),
(192, 92, 290, 'Address19', 19, 'WiFi, TV', 2, 'Mountain', TRUE, NULL),
(193, 93, 300, 'Address19', 19, 'WiFi, TV', 3, 'Sea', TRUE, NULL),
(194, 94, 310, 'Address19', 19, 'WiFi, TV', 4, 'Mountain', TRUE, NULL),
(195, 95, 320, 'Address19', 19, 'WiFi, TV', 5, 'Sea', TRUE, NULL),

-- Rooms for Hotel20
(196, 96, 290, 'Address20', 20, 'WiFi, TV', 1, 'Mountain', TRUE, NULL),
(197, 97, 300, 'Address20', 20, 'WiFi, TV', 2, 'Sea', TRUE, NULL),
(198, 98, 310, 'Address20', 20, 'WiFi, TV', 3, 'Mountain', TRUE, NULL),
(199, 99, 320, 'Address20', 20, 'WiFi, TV', 4, 'Sea', TRUE, NULL),
(200, 100, 330, 'Address20', 20, 'WiFi, TV', 5, 'Mountain', TRUE, NULL),

-- Rooms for Hotel21
(201, 101, 300, 'Address21', 21, 'WiFi, TV', 1, 'Sea', TRUE, NULL),
(202, 102, 310, 'Address21', 21, 'WiFi, TV', 2, 'Mountain', TRUE, NULL),
(203, 103, 320, 'Address21', 21, 'WiFi, TV', 3, 'Sea', TRUE, NULL),
(204, 104, 330, 'Address21', 21, 'WiFi, TV', 4, 'Mountain', TRUE, NULL),
(205, 105, 340, 'Address21', 21, 'WiFi, TV', 5, 'Sea', TRUE, NULL),

-- Rooms for Hotel22
(206, 106, 310, 'Address22', 22, 'WiFi, TV', 1, 'Mountain', TRUE, NULL),
(207, 107, 320, 'Address22', 22, 'WiFi, TV', 2, 'Sea', TRUE, NULL),
(208, 108, 330, 'Address22', 22, 'WiFi, TV', 3, 'Mountain', TRUE, NULL),
(209, 109, 340, 'Address22', 22, 'WiFi, TV', 4, 'Sea', TRUE, NULL),
(210, 110, 350, 'Address22', 22, 'WiFi, TV', 5, 'Mountain', TRUE, NULL),

-- Rooms for Hotel23
(211, 111, 320, 'Address23', 23, 'WiFi, TV', 1, 'Sea', TRUE, NULL),
(212, 112, 330, 'Address23', 23, 'WiFi, TV', 2, 'Mountain', TRUE, NULL),
(213, 113, 340, 'Address23', 23, 'WiFi, TV', 3, 'Sea', TRUE, NULL),
(214, 114, 350, 'Address23', 23, 'WiFi, TV', 4, 'Mountain', TRUE, NULL),
(215, 115, 360, 'Address23', 23, 'WiFi, TV', 5, 'Sea', TRUE, NULL),

-- Rooms for Hotel24
(216, 116, 330, 'Address24', 24, 'WiFi, TV', 1, 'Mountain', TRUE, NULL),
(217, 117, 340, 'Address24', 24, 'WiFi, TV', 2, 'Sea', TRUE, NULL),
(218, 118, 350, 'Address24', 24, 'WiFi, TV', 3, 'Mountain', TRUE, NULL),
(219, 119, 360, 'Address24', 24, 'WiFi, TV', 4, 'Sea', TRUE, NULL),
(220, 120, 370, 'Address24', 24, 'WiFi, TV', 5, 'Mountain', TRUE, NULL),

-- Rooms for Hotel25
(221, 121, 340, 'Address25', 25, 'WiFi, TV', 1, 'Sea', TRUE, NULL),
(222, 122, 350, 'Address25', 25, 'WiFi, TV', 2, 'Mountain', TRUE, NULL),
(223, 123, 360, 'Address25', 25, 'WiFi, TV', 3, 'Sea', TRUE, NULL),
(224, 124, 370, 'Address25', 25, 'WiFi, TV', 4, 'Mountain', TRUE, NULL),
(225, 125, 380, 'Address25', 25, 'WiFi, TV', 5, 'Sea', TRUE, NULL),

-- Rooms for Hotel26
(226, 126, 350, 'Address26', 26, 'WiFi, TV', 1, 'Mountain', TRUE, NULL),
(227, 127, 360, 'Address26', 26, 'WiFi, TV', 2, 'Sea', TRUE, NULL),
(228, 128, 370, 'Address26', 26, 'WiFi, TV', 3, 'Mountain', TRUE, NULL),
(229, 129, 380, 'Address26', 26, 'WiFi, TV', 4, 'Sea', TRUE, NULL),
(230, 130, 390, 'Address26', 26, 'WiFi, TV', 5, 'Mountain', TRUE, NULL),

-- Rooms for Hotel27
(231, 131, 360, 'Address27', 27, 'WiFi, TV', 1, 'Sea', TRUE, NULL),
(232, 132, 370, 'Address27', 27, 'WiFi, TV', 2, 'Mountain', TRUE, NULL),
(233, 133, 380, 'Address27', 27, 'WiFi, TV', 3, 'Sea', TRUE, NULL),
(234, 134, 390, 'Address27', 27, 'WiFi, TV', 4, 'Mountain', TRUE, NULL),
(235, 135, 400, 'Address27', 27, 'WiFi, TV', 5, 'Sea', TRUE, NULL),

-- Rooms for Hotel28
(236, 136, 370, 'Address28', 28, 'WiFi, TV', 1, 'Mountain', TRUE, NULL),
(237, 137, 380, 'Address28', 28, 'WiFi, TV', 2, 'Sea', TRUE, NULL),
(238, 138, 390, 'Address28', 28, 'WiFi, TV', 3, 'Mountain', TRUE, NULL),
(239, 139, 400, 'Address28', 28, 'WiFi, TV', 4, 'Sea', TRUE, NULL),
(240, 140, 410, 'Address28', 28, 'WiFi, TV', 5, 'Mountain', TRUE, NULL),

-- Rooms for Hotel29
(241, 141, 380, 'Address29', 29, 'WiFi, TV', 1, 'Sea', TRUE, NULL),
(242, 142, 390, 'Address29', 29, 'WiFi, TV', 2, 'Mountain', TRUE, NULL),
(243, 143, 400, 'Address29', 29, 'WiFi, TV', 3, 'Sea', TRUE, NULL),
(244, 144, 410, 'Address29', 29, 'WiFi, TV', 4, 'Mountain', TRUE, NULL),
(245, 145, 420, 'Address29', 29, 'WiFi, TV', 5, 'Sea', TRUE, NULL),

-- Rooms for Hotel30
(246, 146, 390, 'Address30', 30, 'WiFi, TV', 1, 'Mountain', TRUE, NULL),
(247, 147, 400, 'Address30', 30, 'WiFi, TV', 2, 'Sea', TRUE, NULL),
(248, 148, 410, 'Address30', 30, 'WiFi, TV', 3, 'Mountain', TRUE, NULL),
(249, 149, 420, 'Address30', 30, 'WiFi, TV', 4, 'Sea', TRUE, NULL),
(250, 150, 430, 'Address30', 30, 'WiFi, TV', 5, 'Mountain', TRUE, NULL),

-- Rooms for Hotel31
(251, 151, 400, 'Address31', 31, 'WiFi, TV', 1, 'Mountain', TRUE, NULL),
(252, 152, 410, 'Address31', 31, 'WiFi, TV', 2, 'Sea', TRUE, NULL),
(253, 153, 420, 'Address31', 31, 'WiFi, TV', 3, 'Mountain', TRUE, NULL),
(254, 154, 430, 'Address31', 31, 'WiFi, TV', 4, 'Sea', TRUE, NULL),
(255, 155, 440, 'Address31', 31, 'WiFi, TV', 5, 'Mountain', TRUE, NULL),

-- Rooms for Hotel32
(256, 156, 410, 'Address32', 32, 'WiFi, TV', 1, 'Sea', TRUE, NULL),
(257, 157, 420, 'Address32', 32, 'WiFi, TV', 2, 'Mountain', TRUE, NULL),
(258, 158, 430, 'Address32', 32, 'WiFi, TV', 3, 'Sea', TRUE, NULL),
(259, 159, 440, 'Address32', 32, 'WiFi, TV', 4, 'Mountain', TRUE, NULL),
(260, 160, 450, 'Address32', 32, 'WiFi, TV', 5, 'Sea', TRUE, NULL),

-- Rooms for Hotel33
(261, 161, 420, 'Address33', 33, 'WiFi, TV', 1, 'Mountain', TRUE, NULL),
(262, 162, 430, 'Address33', 33, 'WiFi, TV', 2, 'Sea', TRUE, NULL),
(263, 163, 440, 'Address33', 33, 'WiFi, TV', 3, 'Mountain', TRUE, NULL),
(264, 164, 450, 'Address33', 33, 'WiFi, TV', 4, 'Sea', TRUE, NULL),
(265, 165, 460, 'Address33', 33, 'WiFi, TV', 5, 'Mountain', TRUE, NULL),

-- Rooms for Hotel34
(266, 166, 430, 'Address34', 34, 'WiFi, TV', 1, 'Sea', TRUE, NULL),
(267, 167, 440, 'Address34', 34, 'WiFi, TV', 2, 'Mountain', TRUE, NULL),
(268, 168, 450, 'Address34', 34, 'WiFi, TV', 3, 'Sea', TRUE, NULL),
(269, 169, 460, 'Address34', 34, 'WiFi, TV', 4, 'Mountain', TRUE, NULL),
(270, 170, 470, 'Address34', 34, 'WiFi, TV', 5, 'Sea', TRUE, NULL),

-- Rooms for Hotel35
(271, 171, 440, 'Address35', 35, 'WiFi, TV', 1, 'Mountain', TRUE, NULL),
(272, 172, 450, 'Address35', 35, 'WiFi, TV', 2, 'Sea', TRUE, NULL),
(273, 173, 460, 'Address35', 35, 'WiFi, TV', 3, 'Mountain', TRUE, NULL),
(274, 174, 470, 'Address35', 35, 'WiFi, TV', 4, 'Sea', TRUE, NULL),
(275, 175, 480, 'Address35', 35, 'WiFi, TV', 5, 'Mountain', TRUE, NULL),


-- Rooms for Hotel36
(276, 176, 450, 'Address36', 36, 'WiFi, TV', 1, 'Sea', TRUE, NULL),
(277, 177, 460, 'Address36', 36, 'WiFi, TV', 2, 'Mountain', TRUE, NULL),
(278, 178, 470, 'Address36', 36, 'WiFi, TV', 3, 'Sea', TRUE, NULL),
(279, 179, 480, 'Address36', 36, 'WiFi, TV', 4, 'Mountain', TRUE, NULL),
(280, 180, 490, 'Address36', 36, 'WiFi, TV', 5, 'Sea', TRUE, NULL),

-- Rooms for Hotel37
(281, 181, 460, 'Address37', 37, 'WiFi, TV', 1, 'Mountain', TRUE, NULL),
(282, 182, 470, 'Address37', 37, 'WiFi, TV', 2, 'Sea', TRUE, NULL),
(283, 183, 480, 'Address37', 37, 'WiFi, TV', 3, 'Mountain', TRUE, NULL),
(284, 184, 490, 'Address37', 37, 'WiFi, TV', 4, 'Sea', TRUE, NULL),
(285, 185, 500, 'Address37', 37, 'WiFi, TV', 5, 'Mountain', TRUE, NULL),

-- Rooms for Hotel38
(286, 186, 470, 'Address38', 38, 'WiFi, TV', 1, 'Sea', TRUE, NULL),
(287, 187, 480, 'Address38', 38, 'WiFi, TV', 2, 'Mountain', TRUE, NULL),
(288, 188, 490, 'Address38', 38, 'WiFi, TV', 3, 'Sea', TRUE, NULL),
(289, 189, 500, 'Address38', 38, 'WiFi, TV', 4, 'Mountain', TRUE, NULL),
(290, 190, 510, 'Address38', 38, 'WiFi, TV', 5, 'Sea', TRUE, NULL),

-- Rooms for Hotel39
(291, 191, 480, 'Address39', 39, 'WiFi, TV', 1, 'Mountain', TRUE, NULL),
(292, 192, 490, 'Address39', 39, 'WiFi, TV', 2, 'Sea', TRUE, NULL),
(293, 193, 500, 'Address39', 39, 'WiFi, TV', 3, 'Mountain', TRUE, NULL),
(294, 194, 510, 'Address39', 39, 'WiFi, TV', 4, 'Sea', TRUE, NULL),
(295, 195, 520, 'Address39', 39, 'WiFi, TV', 5, 'Mountain', TRUE, NULL),

-- Rooms for Hotel40
(296, 196, 490, 'Address40', 40, 'WiFi, TV', 1, 'Sea', TRUE, NULL),
(297, 197, 500, 'Address40', 40, 'WiFi, TV', 2, 'Mountain', TRUE, NULL),
(298, 198, 510, 'Address40', 40, 'WiFi, TV', 3, 'Sea', TRUE, NULL),
(299, 199, 520, 'Address40', 40, 'WiFi, TV', 4, 'Mountain', TRUE, NULL),
(300, 200, 530, 'Address40', 40, 'WiFi, TV', 5, 'Sea', TRUE, NULL);


-- View 1: number of available rooms per area

create view roomsPerArea as
SELECT hc.central_address, COUNT(r.room_id) AS num_rooms
FROM Hotel_Chain hc
JOIN owns o ON hc.chain_name = o.chain_name AND hc.central_address = o.central_address
JOIN Hotel h ON o.hotel_id = h.hotel_id AND o.hotel_address = h.address
JOIN room r ON h.hotel_id = r.hotel_id AND h.address = r.hotel_address
GROUP BY hc.central_address;

select * from roomsPerArea;

-- View 2: capacity per hotel for all rooms
CREATE VIEW totalCapacity AS
SELECT
    hotel_id,
    SUM(capacity) AS total_capacity
FROM
    room
GROUP BY
    hotel_id;

select * from totalCapacity;

-- QUERY 1 using aggregation: finding the average price per hotel

Select hotel_id, AVG(price)::numeric(10,2) as average_price
from room group by hotel_id;


-- QUERY 2 being a nested query: finding the total number of booking a customer makes

SELECT C.customer_id, C.customer_name,
    (
        SELECT COUNT(*)
        FROM Bookings B
        WHERE B.customer_id = C.customer_id
    ) AS total_bookings
FROM
    Customers C;
    
-- Query 3: retrieving information for all available rooms
SELECT room_id as RoomID, room_number as RoomNumber, price, capacity, view_type, amenities, hotel_id, hotel_address
FROM room
WHERE booking_id IS NULL;

-- Query 4: ordering the hotel chains based on the average ratings of their hotels
SELECT HC.chain_name, HC.central_address, AVG(H.category)::numeric(10,1) AS total_rating
FROM Hotel_Chain HC
JOIN owns O ON HC.chain_name = O.chain_name AND HC.central_address = O.central_address
JOIN Hotel H ON O.hotel_id = H.hotel_id AND O.hotel_address = H.address
GROUP BY HC.chain_name, HC.central_address
ORDER BY total_rating DESC;