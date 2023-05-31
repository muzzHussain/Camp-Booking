USE [CampDB]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 25-11-2022 19:30:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_admin]    Script Date: 25-11-2022 19:30:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_admin](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserName] [nvarchar](max) NULL,
	[Password] [nvarchar](max) NULL,
 CONSTRAINT [PK_tbl_admin] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_booking]    Script Date: 25-11-2022 19:30:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_booking](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[BRN] [varchar](max) NOT NULL,
	[address] [varchar](max) NOT NULL,
	[state] [varchar](max) NOT NULL,
	[country] [varchar](max) NOT NULL,
	[zipCode] [varchar](max) NOT NULL,
	[phoneNo] [varchar](max) NOT NULL,
	[campId] [int] NOT NULL,
 CONSTRAINT [PK_tbl_booking] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_camp]    Script Date: 25-11-2022 19:30:01 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_camp](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CampName] [nvarchar](max) NOT NULL,
	[RatePerNight] [int] NOT NULL,
	[Capacity] [int] NOT NULL,
	[Description] [varchar](max) NOT NULL,
	[Image] [varchar](max) NULL,
	[TotalStay] [int] NOT NULL,
	[CheckIn] [date] NOT NULL,
	[CheckOut] [date] NOT NULL,
	[isBooked] [bit] NOT NULL,
	[averageRating] [decimal](18, 2) NOT NULL,
	[userCounter] [int] NOT NULL,
	[overallRating] [int] NOT NULL,
 CONSTRAINT [PK_tbl_camp] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[tbl_booking] ADD  DEFAULT ((0)) FOR [campId]
GO
ALTER TABLE [dbo].[tbl_camp] ADD  DEFAULT (CONVERT([bit],(0))) FOR [isBooked]
GO
ALTER TABLE [dbo].[tbl_camp] ADD  DEFAULT ((0)) FOR [userCounter]
GO
ALTER TABLE [dbo].[tbl_camp] ADD  DEFAULT ((0)) FOR [overallRating]
GO
