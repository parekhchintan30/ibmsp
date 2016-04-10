-- MySQL dump 10.13  Distrib 5.5.42, for Linux (x86_64)
--
-- Host: localhost    Database: vamasin_vims
-- ------------------------------------------------------
-- Server version	5.5.42-cll

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `agents`
--

DROP TABLE IF EXISTS `agents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `agents` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `address` text COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `pin` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `state` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `country` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `contact_no` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `updated_by` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `agents_updated_by_foreign` (`updated_by`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `approval_return`
--

DROP TABLE IF EXISTS `approval_return`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `approval_return` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `invoice_no` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `id_client` int(10) unsigned NOT NULL,
  `quantity` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `billing_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `location` int(11) NOT NULL,
  `updated_by` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `goods_return_id_client_foreign` (`id_client`),
  KEY `goods_return_updated_by_foreign` (`updated_by`)
) ENGINE=MyISAM AUTO_INCREMENT=109 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `approval_return_stack`
--

DROP TABLE IF EXISTS `approval_return_stack`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `approval_return_stack` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `approval_return_id` int(10) unsigned NOT NULL,
  `barcode` varchar(8) COLLATE utf8_unicode_ci NOT NULL,
  `design` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `color` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `size` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `billing_amount` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2319 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `approval_stack`
--

DROP TABLE IF EXISTS `approval_stack`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `approval_stack` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `approval_id` int(10) unsigned NOT NULL,
  `barcode` varchar(8) COLLATE utf8_unicode_ci NOT NULL,
  `design` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `ethnicity_design` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `color` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `size` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `billing_amount` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `approval_stack_approval_id_foreign` (`approval_id`),
  KEY `approval_stack_barcode_foreign` (`barcode`)
) ENGINE=MyISAM AUTO_INCREMENT=12225 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `approvals`
--

DROP TABLE IF EXISTS `approvals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `approvals` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `invoice_no` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `id_client` int(10) unsigned NOT NULL,
  `quantity` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `billing_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `approvals_id_client_foreign` (`id_client`),
  KEY `approvals_updated_by_foreign` (`updated_by`)
) ENGINE=MyISAM AUTO_INCREMENT=205 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clients` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `address` text COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `pin` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `state` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `country` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `contact_no` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `reference_person_name` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `reference_person_number` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ethnicity_reference_number` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `type` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `bill_identifier` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `vat` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tin` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `cst` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `id_agent_1` int(11) DEFAULT NULL,
  `percentage_agent_1` int(11) DEFAULT NULL,
  `id_agent_2` int(11) DEFAULT NULL,
  `percentage_agent_2` int(11) DEFAULT NULL,
  `id_agent_3` int(11) DEFAULT NULL,
  `percentage_agent_3` int(11) DEFAULT NULL,
  `id_agent_4` int(11) DEFAULT NULL,
  `percentage_agent_4` int(11) DEFAULT NULL,
  `tally_sync_count` int(11) NOT NULL DEFAULT '0',
  `tally_sync_date` timestamp NULL DEFAULT NULL,
  `tally_sync_by` tinyint(4) DEFAULT NULL,
  `updated_by` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `clients_updated_by_foreign` (`updated_by`)
) ENGINE=MyISAM AUTO_INCREMENT=551 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `company_accounts`
--

DROP TABLE IF EXISTS `company_accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company_accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_number` varchar(45) NOT NULL,
  `bank_name` varchar(45) DEFAULT NULL,
  `updated_by` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `customers_ecommerce`
--

DROP TABLE IF EXISTS `customers_ecommerce`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customers_ecommerce` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `address_1` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `address_2` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `pin` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `state` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `contry` varchar(50) COLLATE utf8_unicode_ci DEFAULT 'INDIA',
  `contact_no` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `email_id` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `updated_by` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `customers_retail`
--

DROP TABLE IF EXISTS `customers_retail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customers_retail` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `address` text COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `pin` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `state` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `country` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `contact_no` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `updated_by` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6072 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ecommerce_payments`
--

DROP TABLE IF EXISTS `ecommerce_payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ecommerce_payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ecommerce_sale_id` int(11) NOT NULL,
  `payment_amount` decimal(10,0) NOT NULL,
  `payment_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `reference_name_1` varchar(100) DEFAULT NULL,
  `reference_value_1` varchar(100) DEFAULT NULL,
  `reference_name_2` varchar(100) DEFAULT NULL,
  `reference_value_2` varchar(100) DEFAULT NULL,
  `reference_name_3` varchar(100) DEFAULT NULL,
  `reference_value_3` varchar(100) DEFAULT NULL,
  `updated_by` tinyint(4) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `goods_return`
--

DROP TABLE IF EXISTS `goods_return`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `goods_return` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `invoice_no` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `id_client` int(10) unsigned NOT NULL,
  `id_sale` int(10) unsigned NOT NULL,
  `goods_return_against_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `billing_amount` decimal(10,2) NOT NULL,
  `unstitched` tinyint(4) DEFAULT '0',
  `agent_1` int(11) DEFAULT NULL,
  `margin_agent_1_percentage` decimal(10,2) DEFAULT NULL,
  `margin_agent_1` decimal(10,2) DEFAULT NULL,
  `agent_2` int(11) DEFAULT NULL,
  `margin_agent_2` decimal(10,2) DEFAULT NULL,
  `margin_agent_2_percentage` decimal(10,2) DEFAULT NULL,
  `agent_3` int(11) DEFAULT NULL,
  `margin_agent_3` decimal(10,2) DEFAULT NULL,
  `margin_agent_3_percentage` decimal(10,2) DEFAULT NULL,
  `agent_4` int(11) DEFAULT NULL,
  `margin_agent_4` decimal(10,2) DEFAULT NULL,
  `margin_agent_4_percentage` decimal(10,2) DEFAULT NULL,
  `ethnicity_percentage` decimal(10,2) DEFAULT NULL,
  `ethnicity_amount` decimal(10,2) DEFAULT NULL,
  `ethnicity_edc` decimal(10,0) DEFAULT NULL,
  `tax_type` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tax_percentage` decimal(10,2) NOT NULL DEFAULT '0.00',
  `tax` decimal(10,2) NOT NULL,
  `discount_percentage` decimal(10,2) NOT NULL DEFAULT '0.00',
  `discount` decimal(10,2) NOT NULL,
  `courier_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `courier_amount` int(11) DEFAULT NULL,
  `total` decimal(10,2) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `billing_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tally_sync_count` int(11) NOT NULL DEFAULT '0',
  `tally_sync_date` timestamp NULL DEFAULT NULL,
  `tally_sync_by` tinyint(4) DEFAULT NULL,
  `location` int(11) NOT NULL,
  `payment_received` tinyint(4) NOT NULL DEFAULT '0',
  `payment_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `payment_amount` decimal(10,0) NOT NULL DEFAULT '0',
  `updated_by` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `goods_return_id_client_foreign` (`id_client`),
  KEY `goods_return_updated_by_foreign` (`updated_by`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `goods_return_retail`
--

DROP TABLE IF EXISTS `goods_return_retail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `goods_return_retail` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `invoice_no` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `id_customer` int(10) unsigned NOT NULL,
  `quantity` int(11) NOT NULL,
  `billing_amount` int(11) NOT NULL,
  `discount_percentage` int(11) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `total` int(11) NOT NULL,
  `tax` int(11) DEFAULT NULL,
  `reason` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `id_location` int(11) NOT NULL,
  `billing_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `goods_return_retail_stack`
--

DROP TABLE IF EXISTS `goods_return_retail_stack`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `goods_return_retail_stack` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `goods_return_id` int(10) unsigned NOT NULL,
  `barcode` varchar(8) COLLATE utf8_unicode_ci NOT NULL,
  `design` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `color` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `size` int(11) NOT NULL,
  `billing_amount` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `goods_return_stack`
--

DROP TABLE IF EXISTS `goods_return_stack`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `goods_return_stack` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `goods_return_id` int(10) unsigned NOT NULL,
  `barcode` varchar(8) COLLATE utf8_unicode_ci NOT NULL,
  `design` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `color` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `size` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `selling_price_without_discount` int(11) NOT NULL,
  `discount` int(11) NOT NULL DEFAULT '0',
  `selling_price_with_discount` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `goods_return_stack_goods_return_id_foreign` (`goods_return_id`),
  KEY `goods_return_stack_barcode_foreign` (`barcode`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inward_stack`
--

DROP TABLE IF EXISTS `inward_stack`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inward_stack` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `inward_id` int(10) unsigned NOT NULL,
  `barcode` varchar(8) COLLATE utf8_unicode_ci NOT NULL,
  `design` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `ethnicity_design` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `color` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `size` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  `billing_amount` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `inward_stack_inward_id_foreign` (`inward_id`),
  KEY `inward_stack_barcode_foreign` (`barcode`)
) ENGINE=MyISAM AUTO_INCREMENT=42310 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `inwards`
--

DROP TABLE IF EXISTS `inwards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inwards` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `bill_number` int(11) NOT NULL,
  `id_worker` int(10) unsigned NOT NULL,
  `total_inward_quantity` int(11) NOT NULL,
  `total_inward_billing` int(11) NOT NULL,
  `add_to_stock` tinyint(4) DEFAULT '1',
  `updated_by` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `inwards_id_worker_foreign` (`id_worker`),
  KEY `inwards_updated_by_foreign` (`updated_by`)
) ENGINE=MyISAM AUTO_INCREMENT=3368 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `new_product_master`
--

DROP TABLE IF EXISTS `new_product_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `new_product_master` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `barcode` varchar(8) COLLATE utf8_unicode_ci NOT NULL,
  `design` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `color` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `size` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `manufacturing_price` int(11) NOT NULL,
  `wholesale_price` int(11) NOT NULL,
  `other_website_price` int(11) NOT NULL,
  `discounted_price` int(11) DEFAULT NULL,
  `mrp` int(11) NOT NULL,
  `identifier` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `category` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'BLOUSE',
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `sample` tinyint(4) NOT NULL DEFAULT '0',
  `updated_by` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `new_product_master_barcode_unique` (`barcode`),
  KEY `new_product_master_updated_by_foreign` (`updated_by`)
) ENGINE=MyISAM AUTO_INCREMENT=26451 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`vamasin`@`localhost`*/ /*!50003 TRIGGER `Insert new Entries - Product Master` AFTER INSERT ON `new_product_master` FOR EACH ROW INSERT INTO vamasin_inventory.new_product_master (`id`, `barcode`, `design`, `color`, `size`, `manufacturing_price`, `wholesale_price`, `other_website_price`,`discounted_price`, `mrp`, `identifier`, `category`, `active`, `sample`, `updated_by`, `created_at`, `updated_at`) VALUES (NEW.id,NEW.barcode,NEW.design,NEW.color,NEW.size,NEW.manufacturing_price,NEW.wholesale_price,NEW.other_website_price,NEW.discounted_price,NEW.mrp,NEW.identifier,NEW.category,NEW.active,NEW.sample,NEW.updated_by,NEW.created_at,NEW.updated_at) */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`vamasin`@`localhost`*/ /*!50003 TRIGGER `Update Entries - Product Master` AFTER UPDATE ON `new_product_master` FOR EACH ROW UPDATE vamasin_inventory.new_product_master SET 
`barcode`=NEW.barcode,
`design`=NEW.design,
`color`=NEW.color,
`size`=NEW.size,
`manufacturing_price`=NEW.manufacturing_price,
`wholesale_price`=NEW.wholesale_price,
`other_website_price`=NEW.other_website_price,
`mrp`=NEW.mrp,
`discounted_price`=NEW.discounted_price,
`identifier`=NEW.identifier,
`category`=NEW.category,
`active`=NEW.active,
`sample`=NEW.sample,
`updated_by`=NEW.updated_by,
`created_at`=NEW.created_at,
`updated_at`=NEW.updated_at

where id=NEW.id */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `order_stack`
--

DROP TABLE IF EXISTS `order_stack`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_stack` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int(10) unsigned NOT NULL,
  `barcode` varchar(8) COLLATE utf8_unicode_ci NOT NULL,
  `design` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `ethnicity_design` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `color` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `size` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `quantity` int(11) NOT NULL,
  `note` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `id_responsible` tinyint(4) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2223 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_client` int(10) unsigned NOT NULL,
  `total_quantity` int(11) NOT NULL,
  `additional_information` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `additional_information_2` varchar(1000) COLLATE utf8_unicode_ci NOT NULL,
  `sale_id` int(11) DEFAULT NULL,
  `cancelled` tinyint(4) NOT NULL DEFAULT '0',
  `status` tinyint(4) DEFAULT '1',
  `updated_by` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=100018 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_client` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `date_received` date NOT NULL,
  `payment_method` varchar(50) NOT NULL,
  `reference_no` varchar(45) NOT NULL,
  `id_account` int(11) NOT NULL,
  `tally_sync_count` int(11) NOT NULL DEFAULT '0',
  `tally_sync_date` timestamp NULL DEFAULT NULL,
  `tally_sync_by` tinyint(4) DEFAULT NULL,
  `updated_by` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `product_master`
--

DROP TABLE IF EXISTS `product_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_master` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `barcode` varchar(8) COLLATE utf8_unicode_ci NOT NULL,
  `design` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `ethnicity_design` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `color` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `size` int(11) NOT NULL,
  `manufacturing_price` int(11) NOT NULL,
  `wholesale_price` int(11) NOT NULL,
  `other_website_price` int(11) NOT NULL,
  `discounted_price` int(11) DEFAULT NULL,
  `mrp` int(11) NOT NULL,
  `category` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'blouse',
  `sample` tinyint(4) NOT NULL DEFAULT '0',
  `active` tinyint(4) NOT NULL DEFAULT '0',
  `updated_by` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_master_barcode_unique` (`barcode`),
  KEY `product_master_updated_by_foreign` (`updated_by`)
) ENGINE=MyISAM AUTO_INCREMENT=9053 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `register`
--

DROP TABLE IF EXISTS `register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `register` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `inwards_count` int(11) NOT NULL DEFAULT '0',
  `inwards_quantity` int(11) NOT NULL DEFAULT '0',
  `inwards_amount` int(11) NOT NULL DEFAULT '0',
  `approvals_count` int(11) NOT NULL DEFAULT '0',
  `approvals_quantity` int(11) NOT NULL DEFAULT '0',
  `approvals_amount` int(11) NOT NULL DEFAULT '0',
  `sales_count` int(11) NOT NULL DEFAULT '0',
  `sales_quantity` int(11) NOT NULL DEFAULT '0',
  `sales_amount` int(11) NOT NULL DEFAULT '0',
  `goods_return_count` int(11) NOT NULL DEFAULT '0',
  `goods_return_quantity` int(11) NOT NULL DEFAULT '0',
  `goods_return_amount` int(11) NOT NULL DEFAULT '0',
  `total_stock_quantity` int(11) NOT NULL DEFAULT '0',
  `total_stock_amount` int(11) NOT NULL DEFAULT '0',
  `approval_return_count` int(11) NOT NULL DEFAULT '0',
  `approval_return_quantity` int(11) NOT NULL DEFAULT '0',
  `approval_return_amount` int(11) NOT NULL DEFAULT '0',
  `total_pending_payments` int(11) NOT NULL DEFAULT '0',
  `total_pending_payments_amount` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=281 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `retail_credit_notes`
--

DROP TABLE IF EXISTS `retail_credit_notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `retail_credit_notes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goods_return_id` int(11) NOT NULL,
  `id_customer` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `id_location` int(11) NOT NULL,
  `billing_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `payment_method` int(11) DEFAULT NULL,
  `reference_no` varchar(45) DEFAULT NULL,
  `note` varchar(450) DEFAULT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `updated_by` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1000039 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sale_stack`
--

DROP TABLE IF EXISTS `sale_stack`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sale_stack` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sale_id` int(10) unsigned NOT NULL,
  `barcode` varchar(8) COLLATE utf8_unicode_ci NOT NULL,
  `design` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `color` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `size` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `selling_price_without_discount` int(11) NOT NULL,
  `discount` int(11) NOT NULL DEFAULT '0',
  `selling_price_with_discount` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `sale_stack_barcode_foreign` (`barcode`),
  KEY `sale_stack_ibfk_1` (`sale_id`)
) ENGINE=InnoDB AUTO_INCREMENT=103482 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sale_transport_information`
--

DROP TABLE IF EXISTS `sale_transport_information`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sale_transport_information` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sale_id` int(11) NOT NULL,
  `id_client` int(11) NOT NULL,
  `transport_tracking_number` varchar(45) DEFAULT NULL,
  `transport_name` varchar(45) DEFAULT NULL,
  `transport_charges` int(11) DEFAULT NULL,
  `transport_date` timestamp NULL DEFAULT NULL,
  `internal_responsible_person` varchar(45) DEFAULT NULL,
  `delivery_date` datetime DEFAULT NULL,
  `delivery_confirmed_by` varchar(45) DEFAULT NULL,
  `note` varchar(500) DEFAULT NULL,
  `updated_by` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=448 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sales`
--

DROP TABLE IF EXISTS `sales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sales` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `invoice_no` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `id_client` int(10) unsigned NOT NULL,
  `quantity` int(11) NOT NULL,
  `billing_amount` decimal(10,2) NOT NULL,
  `unstitched` tinyint(4) DEFAULT '0',
  `agent_1` int(11) DEFAULT NULL,
  `margin_agent_1_percentage` decimal(10,2) DEFAULT NULL,
  `margin_agent_1` decimal(10,2) DEFAULT NULL,
  `agent_2` int(11) DEFAULT NULL,
  `margin_agent_2` decimal(10,2) DEFAULT NULL,
  `margin_agent_2_percentage` decimal(10,2) DEFAULT NULL,
  `agent_3` int(11) DEFAULT NULL,
  `margin_agent_3` decimal(10,2) DEFAULT NULL,
  `margin_agent_3_percentage` decimal(10,2) DEFAULT NULL,
  `agent_4` int(11) DEFAULT NULL,
  `margin_agent_4` decimal(10,2) DEFAULT NULL,
  `margin_agent_4_percentage` decimal(10,2) DEFAULT NULL,
  `ethnicity_percentage` decimal(10,2) DEFAULT NULL,
  `ethnicity_amount` decimal(10,2) DEFAULT NULL,
  `ethnicity_edc` decimal(10,0) DEFAULT NULL,
  `tax_type` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tax_percentage` decimal(10,2) NOT NULL DEFAULT '0.00',
  `tax` decimal(10,2) NOT NULL,
  `discount_percentage` decimal(10,2) NOT NULL DEFAULT '0.00',
  `discount` decimal(10,2) NOT NULL,
  `courier_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `courier_amount` int(11) DEFAULT NULL,
  `total` decimal(10,2) NOT NULL,
  `location` int(11) NOT NULL,
  `payment_received` tinyint(4) NOT NULL DEFAULT '0',
  `payment_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `payment_amount` decimal(10,0) NOT NULL DEFAULT '0',
  `purchaser` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `billing_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tally_sync_count` int(11) NOT NULL DEFAULT '0',
  `tally_sync_date` timestamp NULL DEFAULT NULL,
  `tally_sync_by` tinyint(4) DEFAULT NULL,
  `updated_by` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `sales_id_client_foreign` (`id_client`),
  KEY `sales_updated_by_foreign` (`updated_by`)
) ENGINE=InnoDB AUTO_INCREMENT=2441 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sales_ecommerce`
--

DROP TABLE IF EXISTS `sales_ecommerce`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sales_ecommerce` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `invoice_no` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `ecommerce_customer_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `billing_amount` int(11) NOT NULL,
  `discount` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `website_id` int(11) NOT NULL,
  `field_name_1` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `field_value_1` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `field_name_2` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `field_value_2` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `field_name_3` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `field_value_3` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `field_name_4` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `field_value_4` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `field_name_5` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `field_value_5` varchar(100) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` tinyint(4) DEFAULT '1',
  `tally_sync_date` timestamp NULL DEFAULT NULL,
  `tally_sync_status` tinyint(4) DEFAULT '0',
  `tally_sync_count` int(11) DEFAULT '0',
  `order_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `return` tinyint(4) NOT NULL DEFAULT '0',
  `return_reason` varchar(500) NOT NULL,
  `return_type` varchar(50) NOT NULL,
  `return_additional_information` varchar(500) NOT NULL,
  `return_field_1` varchar(450) DEFAULT NULL,
  `return_value_1` varchar(450) DEFAULT NULL,
  `return_field_2` varchar(450) DEFAULT NULL,
  `return_value_2` varchar(450) DEFAULT NULL,
  `return_date` timestamp NULL DEFAULT NULL,
  `return_received_date` timestamp NULL DEFAULT NULL,
  `updated_by` int(11) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sales_ecommerce_stack`
--

DROP TABLE IF EXISTS `sales_ecommerce_stack`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sales_ecommerce_stack` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `ecommerce_sale_id` int(10) unsigned NOT NULL,
  `barcode` varchar(8) COLLATE utf8_unicode_ci NOT NULL,
  `design` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `color` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `size` int(11) NOT NULL,
  `selling_price_without_discount` int(11) NOT NULL,
  `discount` int(11) NOT NULL DEFAULT '0',
  `selling_price_with_discount` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sales_group`
--

DROP TABLE IF EXISTS `sales_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sales_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(450) DEFAULT NULL,
  `parent_group` tinyint(4) DEFAULT NULL,
  `tax_type` tinyint(4) DEFAULT NULL,
  `percentage` int(11) DEFAULT NULL,
  `group_description` varchar(450) DEFAULT NULL,
  `created_by` tinyint(4) DEFAULT NULL,
  `tally_sync_count` int(11) NOT NULL DEFAULT '0',
  `tally_sync_date` timestamp NULL DEFAULT NULL,
  `tally_sync_by` tinyint(4) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sales_retail`
--

DROP TABLE IF EXISTS `sales_retail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sales_retail` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `invoice_no` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `id_customer` int(10) unsigned NOT NULL,
  `quantity` int(11) NOT NULL,
  `billing_amount` int(11) NOT NULL,
  `discount_percentage` int(11) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `credit_note_number` int(11) DEFAULT NULL,
  `credit_amount` int(11) DEFAULT NULL,
  `total` int(11) NOT NULL,
  `tax` int(11) DEFAULT NULL,
  `id_location` int(11) NOT NULL,
  `payment_method` int(11) NOT NULL DEFAULT '0',
  `reference_no` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `note` varchar(450) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tally_sync_count` int(11) NOT NULL DEFAULT '0',
  `tally_sync_date` timestamp NULL DEFAULT NULL,
  `tally_sync_by` tinyint(4) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1',
  `billing_date` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_by` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1002979 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sales_retail_stack`
--

DROP TABLE IF EXISTS `sales_retail_stack`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sales_retail_stack` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sale_retail_id` int(10) unsigned NOT NULL,
  `barcode` varchar(8) COLLATE utf8_unicode_ci NOT NULL,
  `design` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `color` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `size` int(11) NOT NULL,
  `selling_price_without_discount` int(11) NOT NULL,
  `discount` int(11) NOT NULL DEFAULT '0',
  `selling_price_with_discount` int(11) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4468 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stock` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `barcode` varchar(8) COLLATE utf8_unicode_ci NOT NULL,
  `warehouse` tinyint(4) NOT NULL DEFAULT '1',
  `party_id` int(10) unsigned DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `stock_barcode_foreign` (`barcode`),
  KEY `stock_party_id_foreign` (`party_id`)
) ENGINE=MyISAM AUTO_INCREMENT=173887 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `tall_sync_status`
--

DROP TABLE IF EXISTS `tall_sync_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tall_sync_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `model` varchar(45) NOT NULL,
  `automation` tinyint(4) NOT NULL,
  `updated_by` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `firstname` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `lastname` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `role` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `id_location` int(195) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `website_mapping`
--

DROP TABLE IF EXISTS `website_mapping`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `website_mapping` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `website_id` int(11) NOT NULL,
  `uin` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `barcode` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `updated_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `websites_ecommerce`
--

DROP TABLE IF EXISTS `websites_ecommerce`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `websites_ecommerce` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `margin` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `bill_identifier` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `updated_by` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `worker_production`
--

DROP TABLE IF EXISTS `worker_production`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `worker_production` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `worker_id` int(10) unsigned NOT NULL,
  `design` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `billing_amount` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `updated_by` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `worker_production_worker_id_foreign` (`worker_id`),
  KEY `worker_production_updated_by_foreign` (`updated_by`)
) ENGINE=MyISAM AUTO_INCREMENT=689 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `workers`
--

DROP TABLE IF EXISTS `workers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `workers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `address` text COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `pin` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `state` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `country` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `updated_by` int(10) unsigned NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  KEY `workers_updated_by_foreign` (`updated_by`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-10-03 20:18:02
