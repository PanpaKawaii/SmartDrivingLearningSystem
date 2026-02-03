--USE MASTER

--DROP DATABASE GreenLight


--CREATE DATABASE GreenLight

--USE GreenLight

IF OBJECT_ID('dbo.[UserNotification]', 'U') IS NOT NULL
    DROP TABLE dbo.[UserNotification];
    GO
IF OBJECT_ID('dbo.[Notification]', 'U') IS NOT NULL
    DROP TABLE dbo.[Notification];
    GO
IF OBJECT_ID('dbo.[Resolve]', 'U') IS NOT NULL
    DROP TABLE dbo.[Resolve];
    GO
IF OBJECT_ID('dbo.[Report]', 'U') IS NOT NULL
    DROP TABLE dbo.[Report];
    GO
IF OBJECT_ID('dbo.[ReportCategory]', 'U') IS NOT NULL
    DROP TABLE dbo.[ReportCategory];
    GO
IF OBJECT_ID('dbo.[SavedTrafficSign]', 'U') IS NOT NULL
    DROP TABLE dbo.[SavedTrafficSign];
    GO
IF OBJECT_ID('dbo.[TrafficSign]', 'U') IS NOT NULL
    DROP TABLE dbo.[TrafficSign];
    GO
IF OBJECT_ID('dbo.[SignCategory]', 'U') IS NOT NULL
    DROP TABLE dbo.[SignCategory];
    GO
IF OBJECT_ID('dbo.[ForumComment]', 'U') IS NOT NULL
    DROP TABLE dbo.[ForumComment];
    GO
IF OBJECT_ID('dbo.[ForumPost]', 'U') IS NOT NULL
    DROP TABLE dbo.[ForumPost];
    GO
IF OBJECT_ID('dbo.[ForumTopic]', 'U') IS NOT NULL
    DROP TABLE dbo.[ForumTopic];
    GO
IF OBJECT_ID('dbo.[ExamDetail]', 'U') IS NOT NULL
    DROP TABLE dbo.[ExamDetail];
    GO
IF OBJECT_ID('dbo.[ExamSession]', 'U') IS NOT NULL
    DROP TABLE dbo.[ExamSession];
    GO
IF OBJECT_ID('dbo.[ExamQuestion]', 'U') IS NOT NULL
    DROP TABLE dbo.[ExamQuestion];
    GO
IF OBJECT_ID('dbo.[Exam]', 'U') IS NOT NULL
    DROP TABLE dbo.[Exam];
    GO
IF OBJECT_ID('dbo.[Answer]', 'U') IS NOT NULL
    DROP TABLE dbo.[Answer];
    GO
IF OBJECT_ID('dbo.[LearningProgress]', 'U') IS NOT NULL
    DROP TABLE dbo.[LearningProgress];
    GO
IF OBJECT_ID('dbo.[SavedQuestion]', 'U') IS NOT NULL
    DROP TABLE dbo.[SavedQuestion];
    GO
IF OBJECT_ID('dbo.[QuestionTag]', 'U') IS NOT NULL
    DROP TABLE dbo.[QuestionTag];
    GO
IF OBJECT_ID('dbo.[Tag]', 'U') IS NOT NULL
    DROP TABLE dbo.[Tag];
    GO
IF OBJECT_ID('dbo.[Question]', 'U') IS NOT NULL
    DROP TABLE dbo.[Question];
    GO
IF OBJECT_ID('dbo.[QuestionDifficultyLevel]', 'U') IS NOT NULL
    DROP TABLE dbo.[QuestionDifficultyLevel];
    GO
IF OBJECT_ID('dbo.[QuestionCategory]', 'U') IS NOT NULL
    DROP TABLE dbo.[QuestionCategory];
    GO
IF OBJECT_ID('dbo.[QuestionChapter]', 'U') IS NOT NULL
    DROP TABLE dbo.[QuestionChapter];
    GO
IF OBJECT_ID('dbo.[SimulationSession]', 'U') IS NOT NULL
    DROP TABLE dbo.[SimulationSession];
    GO
IF OBJECT_ID('dbo.[SimulationScenario]', 'U') IS NOT NULL
    DROP TABLE dbo.[SimulationScenario];
    GO
IF OBJECT_ID('dbo.[SimulationDifficultyLevel]', 'U') IS NOT NULL
    DROP TABLE dbo.[SimulationDifficultyLevel];
    GO
IF OBJECT_ID('dbo.[SimulationCategory]', 'U') IS NOT NULL
    DROP TABLE dbo.[SimulationCategory];
    GO
IF OBJECT_ID('dbo.[SimulationChapter]', 'U') IS NOT NULL
    DROP TABLE dbo.[SimulationChapter];
    GO
IF OBJECT_ID('dbo.[Payment]', 'U') IS NOT NULL
    DROP TABLE dbo.[Payment];
    GO
IF OBJECT_ID('dbo.[User]', 'U') IS NOT NULL
    DROP TABLE dbo.[User];
    GO
IF OBJECT_ID('dbo.[RolePermission]', 'U') IS NOT NULL
    DROP TABLE dbo.[RolePermission];
    GO
IF OBJECT_ID('dbo.[Permission]', 'U') IS NOT NULL
    DROP TABLE dbo.[Permission];
    GO
IF OBJECT_ID('dbo.[Role]', 'U') IS NOT NULL
    DROP TABLE dbo.[Role];
    GO


-- =====================================================
-- AUTH MODULE
-- =====================================================

-- 1.Role OK
CREATE TABLE [Role] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name        NVARCHAR(255) NOT NULL UNIQUE,
    description NVARCHAR(255),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 2.Permission OK
CREATE TABLE [Permission] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name        NVARCHAR(255) NOT NULL UNIQUE,
    description NVARCHAR(255),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 3.RolePermission OF
CREATE TABLE [RolePermission] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    roleId          UNIQUEIDENTIFIER NOT NULL,
    permissionId    UNIQUEIDENTIFIER NOT NULL,
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1,
    FOREIGN KEY (roleId) REFERENCES [Role](id) ON DELETE CASCADE,
    FOREIGN KEY (permissionId) REFERENCES [Permission](id) ON DELETE CASCADE,
    UNIQUE (roleId, permissionId)
);

-- =====================================================
-- USER MODULE
-- =====================================================

-- 4.User AF
CREATE TABLE [User] ( -- Done
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    roleId      UNIQUEIDENTIFIER NOT NULL,
    email       NVARCHAR(255) UNIQUE,
    password    NVARCHAR(255) NOT NULL,
    name        NVARCHAR(255),
    avatar      NVARCHAR(255),
    phone       NVARCHAR(20),
    gender      NVARCHAR(20),
    type        NVARCHAR(20),
    description NVARCHAR(255),
    dateOfBirth DATE,
    licenseType NVARCHAR(50),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1,
    FOREIGN KEY (roleId) REFERENCES [Role](id)
);

-- 5.Payment AF
CREATE TABLE [Payment] ( -- Done
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    userId      UNIQUEIDENTIFIER NOT NULL,
    method      NVARCHAR(255),
    amount      INT,
    note        NVARCHAR(255),
    response    NVARCHAR(255),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1,
    FOREIGN KEY (userId) REFERENCES [User](id)
);

-- =====================================================
-- SIMULATION MODULE
-- =====================================================

-- 6.SimulationChapter OK
CREATE TABLE [SimulationChapter] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name        NVARCHAR(255) NOT NULL UNIQUE,
    description NVARCHAR(255),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 7.SimulationCategory OK
CREATE TABLE [SimulationCategory] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name        NVARCHAR(255) NOT NULL UNIQUE,
    description NVARCHAR(255),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 8.SimulationDifficultyLevel OK
CREATE TABLE [SimulationDifficultyLevel] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name        NVARCHAR(255) NOT NULL UNIQUE,
    description NVARCHAR(255),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 9.SimulationScenario AF
CREATE TABLE [SimulationScenario] ( -- Done
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    simulationChapterId             UNIQUEIDENTIFIER NOT NULL,
    simulationCategoryId            UNIQUEIDENTIFIER NOT NULL,
    simulationDifficultyLevelId     UNIQUEIDENTIFIER NOT NULL,
    name        NVARCHAR(255) NOT NULL UNIQUE,
    description NVARCHAR(255),
    video       NVARCHAR(255),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1,
    FOREIGN KEY (simulationChapterId) REFERENCES [SimulationChapter](id),
    FOREIGN KEY (simulationCategoryId) REFERENCES [SimulationCategory](id),
    FOREIGN KEY (simulationDifficultyLevelId) REFERENCES [SimulationDifficultyLevel](id)
);

-- 10.SimulationSession AF
CREATE TABLE [SimulationSession] ( -- Done
    id              UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    simulationId    UNIQUEIDENTIFIER NOT NULL,
    userId          UNIQUEIDENTIFIER NOT NULL,
    durationSecond  INT,
    score           INT,
    isPassed        BIT NOT NULL DEFAULT 1,
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1,
    FOREIGN KEY (simulationId) REFERENCES [SimulationScenario](id),
    FOREIGN KEY (userId) REFERENCES [User](id)
);

-- =====================================================
-- QUESTION MODULE
-- =====================================================

-- 11.QuestionChapter OK
CREATE TABLE [QuestionChapter] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name        NVARCHAR(255) NOT NULL UNIQUE,
    description NVARCHAR(255),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 12.QuestionCategory OK
CREATE TABLE [QuestionCategory] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name        NVARCHAR(255) NOT NULL UNIQUE,
    description NVARCHAR(255),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 13.QuestionDifficultyLevel OK
CREATE TABLE [QuestionDifficultyLevel] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name        NVARCHAR(255) NOT NULL UNIQUE,
    description NVARCHAR(255),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 14.Question AF
CREATE TABLE [Question] ( -- Done
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    questionChapterId             UNIQUEIDENTIFIER NOT NULL,
    questionCategoryId            UNIQUEIDENTIFIER NOT NULL,
    questionDifficultyLevelId     UNIQUEIDENTIFIER NOT NULL,
    content     NVARCHAR(255) NOT NULL,
    image       NVARCHAR(255),
    explanation NVARCHAR(255),
    type        NVARCHAR(20),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1,
    FOREIGN KEY (questionChapterId) REFERENCES [QuestionChapter](id),
    FOREIGN KEY (questionCategoryId) REFERENCES [QuestionCategory](id),
    FOREIGN KEY (questionDifficultyLevelId) REFERENCES [QuestionDifficultyLevel](id)
);

-- 15.Tag OK
CREATE TABLE [Tag] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name        NVARCHAR(255) NOT NULL UNIQUE,
    description NVARCHAR(255),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
    colorCode   NVARCHAR(255) NOT NULL UNIQUE,
);

-- 16.QuestionTag OF
CREATE TABLE [QuestionTag] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    questionId  UNIQUEIDENTIFIER NOT NULL,
    tagId       UNIQUEIDENTIFIER NOT NULL,
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1,
    FOREIGN KEY (questionId) REFERENCES [Question](id) ON DELETE CASCADE,
    FOREIGN KEY (tagId) REFERENCES [Tag](id) ON DELETE CASCADE,
    UNIQUE (questionId, tagId)
);

-- 17.SavedQuestion OF
CREATE TABLE [SavedQuestion] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    questionId  UNIQUEIDENTIFIER NOT NULL,
    userId      UNIQUEIDENTIFIER NOT NULL,
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1,
    FOREIGN KEY (questionId) REFERENCES [Question](id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES [User](id) ON DELETE CASCADE,
    UNIQUE (questionId, userId)
);

-- 18.LearningProgress OF
CREATE TABLE [LearningProgress] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    questionId  UNIQUEIDENTIFIER NOT NULL,
    userId      UNIQUEIDENTIFIER NOT NULL UNIQUE,
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1,
    FOREIGN KEY (questionId) REFERENCES [Question](id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES [User](id) ON DELETE CASCADE,
    UNIQUE (questionId, userId)
);

-- 19.Answer AF
CREATE TABLE [Answer] ( -- Done
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    questionId  UNIQUEIDENTIFIER NOT NULL,
    content     NVARCHAR(255) NOT NULL,
    isCorrect   BIT NOT NULL DEFAULT 1,
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1,
    FOREIGN KEY (questionId) REFERENCES [Question](id) ON DELETE CASCADE
);

-- =====================================================
-- EXAM MODULE
-- =====================================================

-- 20.Exam AF
CREATE TABLE [Exam] ( -- NotDone
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    userId UUID REFERENCES [User](id),
    title       NVARCHAR(255) NOT NULL,
    description TEXT,
    ownDone INTEGER DEFAULT 0,
    totalQuestion INTEGER,
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 21.ExamQuestion OF
CREATE TABLE [ExamQuestion] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    questionId  UNIQUEIDENTIFIER NOT NULL,
    examId      UNIQUEIDENTIFIER NOT NULL,
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1,
    FOREIGN KEY (questionId) REFERENCES [Question](id) ON DELETE CASCADE,
    FOREIGN KEY (examId) REFERENCES [Exam](id) ON DELETE CASCADE,
    UNIQUE (questionId, examId)
);

-- 22.ExamSession AF
CREATE TABLE [ExamSession] ( -- NotDone
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    examId UUID REFERENCES Exam(id) ON DELETE CASCADE,
    userId UUID REFERENCES [User](id),
    score INTEGER,
    isPassed BIT NOT NULL DEFAULT 1,
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 23.ExamDetail OF
CREATE TABLE [ExamDetail] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    answerId        UNIQUEIDENTIFIER NOT NULL,
    examSessionId   UNIQUEIDENTIFIER NOT NULL,
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1,
    FOREIGN KEY (answerId) REFERENCES [Answer](id) ON DELETE CASCADE,
    FOREIGN KEY (examSessionId) REFERENCES [ExamSession](id) ON DELETE CASCADE,
    UNIQUE (answerId, examSessionId)
);

-- =====================================================
-- FORUM MODULE
-- =====================================================

-- 24.ForumTopic OK
CREATE TABLE [ForumTopic] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name        NVARCHAR(255) NOT NULL UNIQUE,
    description NVARCHAR(255),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 25.ForumPost AF
CREATE TABLE [ForumPost] ( -- NotDone
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    forumTopicId UUID REFERENCES ForumTopic(id),
    userId UUID REFERENCES [User](id),
    name NVARCHAR(200),
    title       NVARCHAR(255) NOT NULL,
    content     NVARCHAR(255) NOT NULL,
    viewCount INTEGER DEFAULT 0,
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 26.ForumComment AF
CREATE TABLE [ForumComment] ( -- NotDone
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    replyId UUID REFERENCES ForumComment(id),
    forumPostId UUID REFERENCES ForumPost(id) ON DELETE CASCADE,
    userId UUID REFERENCES [User](id),
    content     NVARCHAR(255) NOT NULL,
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- =====================================================
-- TRAFFIC SIGN MODULE
-- =====================================================

-- 27.SignCategory OK
CREATE TABLE [SignCategory] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name        NVARCHAR(255) NOT NULL UNIQUE,
    description NVARCHAR(255),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 28.TrafficSign AF
CREATE TABLE [TrafficSign] ( -- NotDone
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    trafficSignCategoryId UUID REFERENCES TrafficSignCategory(id),
    name NVARCHAR(200),
    description TEXT,
    image       NVARCHAR(255),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 29.SavedTrafficSign OF
CREATE TABLE [SavedTrafficSign] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    trafficSignId   UNIQUEIDENTIFIER NOT NULL,
    userId          UNIQUEIDENTIFIER NOT NULL,
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1,
    FOREIGN KEY (trafficSignId) REFERENCES [TrafficSign](id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES [User](id) ON DELETE CASCADE,
    UNIQUE (trafficSignId, userId)
);

-- =====================================================
-- REPORT MODULE
-- =====================================================

-- 30.ReportCategory OK
CREATE TABLE [ReportCategory] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name        NVARCHAR(255) NOT NULL UNIQUE,
    description NVARCHAR(255),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 31.Report AF
CREATE TABLE [Report] ( -- NotDone
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    questionId UUID REFERENCES Question(id),
    reportCategoryId UUID REFERENCES ReportCategory(id),
    simulationId UUID REFERENCES SimulationScenario(id),
    userId UUID REFERENCES [User](id),
    title       NVARCHAR(255) NOT NULL,
    content     NVARCHAR(255) NOT NULL,
    image       NVARCHAR(255),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 32.Resolve AF
CREATE TABLE [Resolve] ( -- NotDone
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    reportId UUID REFERENCES Report(id) ON DELETE CASCADE,
    title       NVARCHAR(255) NOT NULL,
    content     NVARCHAR(255) NOT NULL,
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- =====================================================
-- NOTIFICATION MODULE
-- =====================================================

-- 33.Notification OK
CREATE TABLE [Notification] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    title       NVARCHAR(255) NOT NULL,
    content     NVARCHAR(255) NOT NULL,
    image       NVARCHAR(255),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 34.UserNotification OF
CREATE TABLE [UserNotification] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    notificationId  UNIQUEIDENTIFIER NOT NULL,
    userId          UNIQUEIDENTIFIER NOT NULL,
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1,
    FOREIGN KEY (notificationId) REFERENCES [Notification](id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES [User](id) ON DELETE CASCADE
);

INSERT INTO [Role] VALUES
(N'Admin',      N'Manage system and users', 1),
(N'Instructor', N'Manage questions bank, simulations, exams, forum, ...', 1),
(N'Student',    N'Student of the system', 1);

SELECT * FROM [Role]
SELECT * FROM [Permission]
SELECT * FROM [RolePermission]