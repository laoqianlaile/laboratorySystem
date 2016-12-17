/*
 Navicat Premium Data Transfer

 Source Server         : MySQL
 Source Server Type    : MySQL
 Source Server Version : 50713
 Source Host           : localhost
 Source Database       : lab

 Target Server Type    : MySQL
 Target Server Version : 50713
 File Encoding         : utf-8

 Date: 09/26/2016 14:38:50 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `client`
-- ----------------------------
DROP TABLE IF EXISTS `client`;
CREATE TABLE `client` (
  `ID` varchar(255) NOT NULL,
  `clientNo` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `sex` int(11) DEFAULT NULL COMMENT '0-女，1-男',
  `phoneNumber` varchar(255) DEFAULT NULL,
  `companyID` varchar(255) DEFAULT NULL COMMENT '关联company表主键',
  `createTime` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `company`
-- ----------------------------
DROP TABLE IF EXISTS `company`;
CREATE TABLE `company` (
  `ID` varchar(255) NOT NULL,
  `companyCode` varchar(255) DEFAULT NULL,
  `companyName` varchar(255) DEFAULT NULL,
  `linkMan` varchar(255) DEFAULT NULL,
  `mobilePhone` varchar(255) DEFAULT NULL,
  `flxedTelephone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `businessLicence` varchar(255) DEFAULT NULL,
  `scope` varchar(255) DEFAULT NULL,
  `type` int(11) DEFAULT NULL COMMENT '0-外包公司，1-甲方公司，2-厂商',
  `remarks` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `company`
-- ----------------------------
BEGIN;
INSERT INTO `company` VALUES ('1', '1', 'cqut', '陈钰博', '15912341234', '85900000', '啊啊啊啊', '2016-09-24 10:44:17', '营业执照', 'a-b', '1', '啊啊啊');
COMMIT;

-- ----------------------------
--  Table structure for `contract`
-- ----------------------------
DROP TABLE IF EXISTS `contract`;
CREATE TABLE `contract` (
  `ID` varchar(255) NOT NULL,
  `contractCode` varchar(255) DEFAULT NULL,
  `contractName` varchar(255) DEFAULT NULL,
  `companyID` varchar(255) DEFAULT NULL COMMENT '关联company表主键',
  `oppositeMen` varchar(255) DEFAULT NULL,
  `linkPhone` varchar(255) DEFAULT NULL,
  `employeeID` varchar(255) DEFAULT NULL COMMENT '关联employee表主键',
  `signAddress` varchar(255) DEFAULT NULL,
  `signTime` datetime DEFAULT NULL,
  `startTime` datetime DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  `contractAmount` double(20,0) DEFAULT NULL,
  `fileID` varchar(255) DEFAULT NULL COMMENT '关联file表主键',
  `isClassified` int(11) DEFAULT NULL COMMENT '0-否，1-是',
  `classifiedLevel` int(11) DEFAULT NULL COMMENT '0-秘密，1-机密，2-绝密',
  `state` int(11) DEFAULT NULL COMMENT '0-未上传合同文件，1-未提交，2-审核中，3-驳回，4-审核通过，5-执行中，6-执行完成，7-异常终止',
  `viewpoint` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `contract`
-- ----------------------------
BEGIN;
INSERT INTO `contract` VALUES ('1', '2016001', '合同1', '1', '陈钰博', '15911111111', '1', '啊啊', '2016-09-01 10:53:02', '2016-09-08 10:52:57', '2016-09-24 10:52:55', '100000', '1', '0', null, '5', 'aaaaa'), ('2', '2016001', '合同1', '1', '陈钰博', '15911111111', '1', '啊啊', '2016-09-01 10:53:02', '2016-09-08 10:52:57', '2016-09-24 10:52:55', '100000', '1', '1', '0', '5', 'aaaaa');
COMMIT;

-- ----------------------------
--  Table structure for `contractFineItem`
-- ----------------------------
DROP TABLE IF EXISTS `contractFineItem`;
CREATE TABLE `contractFineItem` (
  `ID` varchar(255) NOT NULL,
  `testProjectID` varchar(255) DEFAULT NULL COMMENT '关联testProject表主键',
  `fineItemCode` varchar(255) DEFAULT NULL,
  `fineItemNameEn` varchar(255) DEFAULT NULL,
  `fineItemNameCn` varchar(255) DEFAULT NULL,
  `isOutsourcing` int(11) DEFAULT NULL COMMENT '0-内侧，1-外包',
  `departmentID` varchar(255) DEFAULT NULL COMMENT '关联department表主键',
  `number` int(11) DEFAULT NULL,
  `price` double(20,0) DEFAULT NULL,
  `calculateType` int(11) DEFAULT NULL COMMENT '0-按单位算，1-按时间算',
  `hour` int(11) DEFAULT NULL,
  `outSourcingDepartmentID` varchar(255) DEFAULT NULL COMMENT '关联department表主键',
  `money` double(255,0) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `contractID` varchar(255) DEFAULT NULL COMMENT '关联contract表主键',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `department`
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department` (
  `ID` varchar(255) NOT NULL,
  `departmentName` varchar(255) DEFAULT NULL,
  `departmentCode` varchar(255) DEFAULT NULL,
  `employeeID` varchar(255) DEFAULT NULL COMMENT '关联employee表主键',
  `remarks` varchar(255) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `parentID` varchar(255) DEFAULT NULL COMMENT '自关联（关联department表主键）',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `document`
-- ----------------------------
DROP TABLE IF EXISTS `document`;
CREATE TABLE `document` (
  `ID` varchar(255) NOT NULL,
  `documentCode` varchar(255) DEFAULT NULL,
  `documentName` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `documentTypeID` varchar(255) DEFAULT NULL COMMENT '关联documentType表主键',
  `saveTime` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `documentType`
-- ----------------------------
DROP TABLE IF EXISTS `documentType`;
CREATE TABLE `documentType` (
  `ID` varchar(255) NOT NULL,
  `documentTypeCode` varchar(255) DEFAULT NULL,
  `documentTypeName` varchar(255) DEFAULT NULL,
  `scope` varchar(255) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `duty`
-- ----------------------------
DROP TABLE IF EXISTS `duty`;
CREATE TABLE `duty` (
  `ID` varchar(255) DEFAULT NULL,
  `dutyName` varchar(255) DEFAULT NULL,
  `dutyCode` varchar(255) DEFAULT NULL,
  `introduction` varchar(255) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `employee`
-- ----------------------------
DROP TABLE IF EXISTS `employee`;
CREATE TABLE `employee` (
  `ID` varchar(255) NOT NULL,
  `employeeCode` varchar(255) DEFAULT NULL,
  `loginName` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `employeeName` varchar(255) DEFAULT NULL,
  `sex` int(11) DEFAULT NULL COMMENT '0-女，1-男',
  `phoneNumber` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `roleID` varchar(255) DEFAULT NULL COMMENT '关联role表主键',
  `departmentID` varchar(255) DEFAULT NULL COMMENT '关联department表主键',
  `level` int(11) DEFAULT NULL COMMENT '0-初级，1-中级，2-高级',
  `createTime` datetime DEFAULT NULL,
  `state` int(11) DEFAULT NULL COMMENT '0-禁用，1-启用',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `employee`
-- ----------------------------
BEGIN;
INSERT INTO `employee` VALUES ('1\n20140918184253004		2016-09-01 09:59:13	\n', '2016001', 'cyb', '123', '陈钰博', '1', '15912341234', 'chenyubo1996@gmail.com', '花溪街道', '1\n', '1', '0', '2016-09-24 10:47:55', '1');
COMMIT;

-- ----------------------------
--  Table structure for `equipment`
-- ----------------------------
DROP TABLE IF EXISTS `equipment`;
CREATE TABLE `equipment` (
  `ID` varchar(255) NOT NULL,
  `equipmentCode` varchar(255) DEFAULT NULL,
  `equipmentName` varchar(255) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `departmentID` varchar(255) DEFAULT NULL COMMENT '关联department表主键',
  `buyTime` datetime DEFAULT NULL,
  `useYear` int(11) DEFAULT NULL,
  `equipmentTypeID` varchar(255) DEFAULT NULL COMMENT '关联equipmentType表主键',
  `employeeID` varchar(255) DEFAULT NULL COMMENT '关联employee表主键',
  `remarks` varchar(255) DEFAULT NULL,
  `state` int(11) DEFAULT NULL COMMENT '0-未审核，1-通过，2-驳回',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `equipmentRepair`
-- ----------------------------
DROP TABLE IF EXISTS `equipmentRepair`;
CREATE TABLE `equipmentRepair` (
  `ID` varchar(255) NOT NULL,
  `equipmentID` varchar(255) DEFAULT NULL,
  `repairTime` datetime DEFAULT NULL,
  `employeeID` varchar(255) DEFAULT NULL,
  `beforeStatus` varchar(255) DEFAULT NULL,
  `afterStatus` varchar(255) DEFAULT NULL,
  `mounting` varchar(255) DEFAULT NULL,
  `money` float(20,0) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `equipmentScrap`
-- ----------------------------
DROP TABLE IF EXISTS `equipmentScrap`;
CREATE TABLE `equipmentScrap` (
  `ID` varchar(255) NOT NULL,
  `equipmentID` varchar(255) DEFAULT NULL,
  `buyTime` datetime DEFAULT NULL,
  `employeeID` varchar(255) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `checkinTime` datetime DEFAULT NULL,
  `useTime` int(11) DEFAULT NULL,
  `money` float(20,0) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `equipmentType`
-- ----------------------------
DROP TABLE IF EXISTS `equipmentType`;
CREATE TABLE `equipmentType` (
  `ID` varchar(255) NOT NULL,
  `typeCode` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `equipmentUse`
-- ----------------------------
DROP TABLE IF EXISTS `equipmentUse`;
CREATE TABLE `equipmentUse` (
  `ID` varchar(255) NOT NULL,
  `equipmentID` varchar(255) DEFAULT NULL,
  `testProjectID` varchar(255) DEFAULT NULL,
  `sampleID` varchar(255) DEFAULT NULL,
  `useNumber` int(11) DEFAULT NULL,
  `application` varchar(255) DEFAULT NULL COMMENT '关联employee主键',
  `startTime` datetime DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  `applyTime` datetime DEFAULT NULL,
  `returnTime` datetime DEFAULT NULL,
  `effectiveTime` int(11) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `state` int(11) DEFAULT NULL COMMENT '0-未审核，1-通过，2-驳回',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `equipmentVerify`
-- ----------------------------
DROP TABLE IF EXISTS `equipmentVerify`;
CREATE TABLE `equipmentVerify` (
  `ID` varchar(255) NOT NULL,
  `equipmentID` varchar(255) DEFAULT NULL,
  `verifyID` varchar(255) DEFAULT NULL COMMENT '关联employee主键',
  `testProjectID` varchar(255) DEFAULT NULL,
  `accuracy` int(11) DEFAULT NULL COMMENT '0-低，1-中，2-高',
  `departmentID` varchar(255) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `result` int(11) DEFAULT NULL COMMENT '0-未审核，1-通过，2-驳回',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `fileInformation`
-- ----------------------------
DROP TABLE IF EXISTS `fileInformation`;
CREATE TABLE `fileInformation` (
  `ID` varchar(255) NOT NULL,
  `belongtoID` varchar(255) DEFAULT NULL COMMENT '自动关联相应类型表主键（）（设计对应多个，在这上面关联，否则再对方表关联，如合同，一个合同最终只有一个文件，所有从合同上对应过来）',
  `fileName` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `uploaderID` varchar(255) DEFAULT NULL COMMENT '关联employee表主键',
  `uploadTime` datetime DEFAULT NULL,
  `state` int(11) DEFAULT NULL COMMENT '0-未提交，1-待审核，2-通过，3-驳回',
  `type` int(11) DEFAULT NULL COMMENT '0-合同文件，1-合同附件，2-交接单文件，3-原始数据，4-报告文件',
  `remarks` varchar(255) DEFAULT NULL,
  `filePassword` varchar(255) DEFAULT NULL,
  `pathPassword` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `jouranlAccount`
-- ----------------------------
DROP TABLE IF EXISTS `jouranlAccount`;
CREATE TABLE `jouranlAccount` (
  `ID` varchar(255) NOT NULL,
  `contractID` varchar(255) DEFAULT NULL,
  `projectID` varchar(255) DEFAULT NULL,
  `invoice` varchar(255) DEFAULT NULL,
  `employeeID` varchar(255) DEFAULT NULL,
  `money` float(20,0) DEFAULT NULL,
  `checkinTime` datetime DEFAULT NULL,
  `contractFineItemID` varchar(255) DEFAULT NULL,
  `state` int(11) DEFAULT NULL COMMENT '0-已录入，1-未录入',
  `remarks` varchar(255) DEFAULT NULL,
  `isIncome` int(11) DEFAULT NULL COMMENT '0-支出，1-收入',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `module`
-- ----------------------------
DROP TABLE IF EXISTS `module`;
CREATE TABLE `module` (
  `ID` varchar(255) NOT NULL,
  `text` varchar(255) DEFAULT NULL,
  `parent` varchar(255) DEFAULT NULL,
  `hasChild` int(11) DEFAULT NULL,
  `level0` int(11) DEFAULT NULL COMMENT '模块层级',
  `isEndOfModuleLevel` int(11) DEFAULT NULL COMMENT '是否最底层模块',
  `childShowType` int(11) DEFAULT NULL COMMENT '子模块是否展示',
  `moduleType` int(11) DEFAULT NULL,
  `isShow` int(11) DEFAULT NULL,
  `moduleCode` varchar(255) DEFAULT NULL,
  `href` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `isFolder` int(11) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `checked` int(11) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `backColor` varchar(255) DEFAULT NULL COMMENT '背景颜色',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `originaldata`
-- ----------------------------
DROP TABLE IF EXISTS `originaldata`;
CREATE TABLE `originaldata` (
  `ID` varchar(255) NOT NULL,
  `taskID` varchar(255) DEFAULT NULL,
  `originaldataCode` varchar(255) DEFAULT NULL,
  `fileID` varchar(255) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `state` int(11) DEFAULT NULL COMMENT '0-审核未通过，1-审核中，2-审核通过',
  `suggest` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `paymentDetail`
-- ----------------------------
DROP TABLE IF EXISTS `paymentDetail`;
CREATE TABLE `paymentDetail` (
  `ID` varchar(255) NOT NULL,
  `jouranlAccountID` varchar(255) DEFAULT NULL,
  `taskID` varchar(255) DEFAULT NULL,
  `employeeID` varchar(255) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `permission`
-- ----------------------------
DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission` (
  `ID` varchar(255) NOT NULL,
  `roleID` varchar(255) DEFAULT NULL COMMENT '关联role主键',
  `moduleCode` varchar(255) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `permission`
-- ----------------------------
BEGIN;
INSERT INTO `permission` VALUES ('1', '1', null, null, null);
COMMIT;

-- ----------------------------
--  Table structure for `project`
-- ----------------------------
DROP TABLE IF EXISTS `project`;
CREATE TABLE `project` (
  `ID` varchar(255) NOT NULL,
  `contractID` varchar(255) DEFAULT NULL,
  `state` int(11) DEFAULT NULL COMMENT '0-无合同，1-合同进行中；2-检测中，2-数据审核中，3-报告审核中，4-完成，5-异常终止',
  `createTime` datetime DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `receiptlist`
-- ----------------------------
DROP TABLE IF EXISTS `receiptlist`;
CREATE TABLE `receiptlist` (
  `ID` varchar(255) NOT NULL,
  `contractID` varchar(255) DEFAULT NULL COMMENT '关联contract表主键',
  `projectID` varchar(255) DEFAULT NULL COMMENT '关联project表主键',
  `linkMan` varchar(255) DEFAULT NULL,
  `linkPhone` varchar(255) DEFAULT NULL,
  `receiptlistCode` varchar(255) DEFAULT NULL,
  `employeeID` varchar(255) DEFAULT NULL COMMENT '关联employee表主键',
  `acceptSampleTime` datetime DEFAULT NULL,
  `state` int(11) DEFAULT NULL COMMENT '0-未检测，1-检测中，2-检测完成，3-异常终止',
  `isEditSample` int(11) DEFAULT NULL COMMENT '0-不能编辑（未分配），1-能编辑（未分配），2-分配（所有的都分配了）',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `receiptlist`
-- ----------------------------
BEGIN;
INSERT INTO `receiptlist` VALUES ('1', '1', null, 'cyb', null, 'aaaaa', '1', '2016-09-24 15:13:51', '1', null);
COMMIT;

-- ----------------------------
--  Table structure for `role`
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `ID` varchar(255) NOT NULL,
  `createID` varchar(255) DEFAULT NULL COMMENT '关联employee主键',
  `createTime` datetime DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `role`
-- ----------------------------
BEGIN;
INSERT INTO `role` VALUES ('1', '1', '2016-09-24 15:31:33', null), ('2', '1', '2016-09-24 15:31:35', null), ('3', '1', '2016-09-24 15:31:37', null), ('4', '1', '2016-09-24 15:31:40', null), ('5', '1', '2016-09-24 15:31:43', null), ('6', '1', '2016-09-24 15:31:45', null);
COMMIT;

-- ----------------------------
--  Table structure for `sample`
-- ----------------------------
DROP TABLE IF EXISTS `sample`;
CREATE TABLE `sample` (
  `ID` varchar(255) NOT NULL,
  `sampleName` varchar(255) DEFAULT NULL,
  `specifications` varchar(255) DEFAULT NULL,
  ` unit` varchar(255) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `sampleInformation`
-- ----------------------------
DROP TABLE IF EXISTS `sampleInformation`;
CREATE TABLE `sampleInformation` (
  `ID` varchar(255) NOT NULL,
  `factoryCode` varchar(255) DEFAULT NULL,
  `sampleName` varchar(255) DEFAULT NULL,
  `receiptlistID` varchar(255) DEFAULT NULL COMMENT '关联receiptlist表主键',
  `createTime` datetime DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `specifications` varchar(255) DEFAULT NULL,
  `state` int(11) DEFAULT NULL COMMENT '0-未领用，1-领用',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `sampleRecord`
-- ----------------------------
DROP TABLE IF EXISTS `sampleRecord`;
CREATE TABLE `sampleRecord` (
  `ID` varchar(255) NOT NULL,
  `factoryCode` varchar(255) DEFAULT NULL,
  `getMan` varchar(255) DEFAULT NULL,
  `getTime` datetime DEFAULT NULL,
  `returnMan` varchar(255) DEFAULT NULL,
  `returnTime` datetime DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `standard`
-- ----------------------------
DROP TABLE IF EXISTS `standard`;
CREATE TABLE `standard` (
  `ID` varchar(255) NOT NULL,
  `standardCode` varchar(255) DEFAULT NULL,
  `standardName` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `scope` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `suggest` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `state` int(11) DEFAULT NULL COMMENT '0-待审核，1-通过，2-已废弃，3-驳回',
  `applicationType` int(11) DEFAULT NULL COMMENT '关联standardType主键',
  `remarks` varchar(255) DEFAULT NULL,
  `editState` int(11) DEFAULT NULL COMMENT '0-可编辑，1-不可编辑',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `standardType`
-- ----------------------------
DROP TABLE IF EXISTS `standardType`;
CREATE TABLE `standardType` (
  `ID` varchar(255) NOT NULL,
  `standardCode` varchar(255) DEFAULT NULL,
  `standardName` varchar(255) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `task`
-- ----------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task` (
  `ID` varchar(255) NOT NULL,
  `receiptlistID` varchar(255) DEFAULT NULL COMMENT '关联receiptlist表主键',
  `sampleInformationID` varchar(255) DEFAULT NULL COMMENT '关联sampleInformation表主键',
  `testProjectID` varchar(255) DEFAULT NULL COMMENT '关联testProject表主键',
  `startTime` datetime DEFAULT NULL,
  `endTime` datetime DEFAULT NULL,
  `completeTime` datetime DEFAULT NULL,
  `custodian` varchar(255) DEFAULT NULL COMMENT '关联employee表主键',
  `result` varchar(255) DEFAULT NULL,
  `allotstate` int(11) DEFAULT NULL COMMENT '0-未分配，1-已分配',
  `originaldataID` varchar(255) DEFAULT NULL COMMENT '关联originaldata表主键',
  `testReportID` varchar(255) DEFAULT NULL COMMENT '关联testReport表主键',
  `detectstate` int(11) DEFAULT NULL COMMENT '0-未领样，1-检测中，2-检测过程完成，4-录原始数，5-数据审核中，3-数据审核通过，4-录报告，5-报告二审中，6-报告三审中，7-驳回，8签发',
  `sendReportTime` datetime DEFAULT NULL,
  `acceptman` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `taskEquipment`
-- ----------------------------
DROP TABLE IF EXISTS `taskEquipment`;
CREATE TABLE `taskEquipment` (
  `ID` varchar(255) NOT NULL,
  `taskID` varchar(255) DEFAULT NULL COMMENT '关联task表主键',
  `equipmentID` varchar(255) DEFAULT NULL COMMENT '关联equipment主键',
  `useTime` datetime DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `taskMan`
-- ----------------------------
DROP TABLE IF EXISTS `taskMan`;
CREATE TABLE `taskMan` (
  `ID` varchar(255) NOT NULL,
  `taskID` varchar(255) DEFAULT NULL,
  `detector` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `template`
-- ----------------------------
DROP TABLE IF EXISTS `template`;
CREATE TABLE `template` (
  `ID` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `verifyMan` varchar(255) DEFAULT NULL,
  `suggest` varchar(255) DEFAULT NULL,
  `fileID` varchar(255) DEFAULT NULL,
  `state` int(11) DEFAULT NULL COMMENT '0-合同文件，1-合同附件，2-交接单文件，3-报告文件',
  `templateType` int(11) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `testInstument`
-- ----------------------------
DROP TABLE IF EXISTS `testInstument`;
CREATE TABLE `testInstument` (
  `ID` varchar(255) NOT NULL,
  `testProjectID` varchar(255) DEFAULT NULL,
  `equipmentID` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `testProject`
-- ----------------------------
DROP TABLE IF EXISTS `testProject`;
CREATE TABLE `testProject` (
  `ID` varchar(255) NOT NULL,
  `nameEn` varchar(255) DEFAULT NULL COMMENT '英文名称',
  `nameCn` varchar(255) DEFAULT NULL COMMENT '中文名称',
  `departmentID` varchar(255) DEFAULT NULL COMMENT '关联department表主键',
  `environmentalRequirements` varchar(255) DEFAULT NULL,
  `standardID` varchar(255) DEFAULT NULL COMMENT '关联standard表主键',
  `createTime` datetime DEFAULT NULL,
  `templateID` varchar(255) DEFAULT NULL COMMENT '关联template表主键',
  `remarks` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `testReport`
-- ----------------------------
DROP TABLE IF EXISTS `testReport`;
CREATE TABLE `testReport` (
  `ID` varchar(255) NOT NULL,
  `receiptlistID` varchar(255) DEFAULT NULL,
  `taskID` varchar(255) DEFAULT NULL,
  `fileID` varchar(255) DEFAULT NULL,
  `versionNumber` varchar(255) DEFAULT NULL,
  `versionInformation` varchar(255) DEFAULT NULL,
  `state` int(11) DEFAULT NULL COMMENT '0-未提交，1-审核中（对报告人来说）；-未审核（对审核报告来说），2-审核未通过，3-审核通过，4-归档',
  `dismissreason2` varchar(255) DEFAULT NULL,
  `dismissreason3` varchar(255) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `testStandard`
-- ----------------------------
DROP TABLE IF EXISTS `testStandard`;
CREATE TABLE `testStandard` (
  `ID` varchar(255) NOT NULL,
  `testPorjectID` varchar(255) DEFAULT NULL COMMENT '关联testProject表主键',
  `standardID` varchar(255) DEFAULT NULL COMMENT '关联standard表主键',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
