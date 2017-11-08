# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table document (
  id                        bigint auto_increment not null,
  reg_date                  varchar(255),
  doc_type                  varchar(255),
  doc_numb                  varchar(255),
  doc_holder                varchar(255),
  dob                       varchar(255),
  gender                    varchar(255),
  place_of_issue            varchar(255),
  place_of_find             varchar(255),
  status                    varchar(255),
  constraint pk_document primary key (id))
;

create table document_type (
  id                        bigint auto_increment not null,
  doc_name                  varchar(255),
  constraint pk_document_type primary key (id))
;

create table message (
  id                        bigint auto_increment not null,
  date                      varchar(255),
  names                     varchar(255),
  subject                   varchar(255),
  phone                     varchar(255),
  message                   TEXT,
  constraint pk_message primary key (id))
;

create table user (
  id                        bigint auto_increment not null,
  names                     varchar(255),
  email                     varchar(255),
  phone                     varchar(255),
  password                  varchar(255),
  role                      varchar(255),
  join_date                 varchar(255),
  constraint pk_user primary key (id))
;




# --- !Downs

SET FOREIGN_KEY_CHECKS=0;

drop table document;

drop table document_type;

drop table message;

drop table user;

SET FOREIGN_KEY_CHECKS=1;

