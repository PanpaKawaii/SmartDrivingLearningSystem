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

-- 1.Role
CREATE TABLE [Role] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name        NVARCHAR(255) NOT NULL UNIQUE,
    description NVARCHAR(255),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 2.Permission
CREATE TABLE [Permission] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name        NVARCHAR(255) NOT NULL UNIQUE,
    description NVARCHAR(255),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 3.RolePermission
CREATE TABLE [RolePermission] (
    id              UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
    roleId          UNIQUEIDENTIFIER NOT NULL,
    permissionId    UNIQUEIDENTIFIER NOT NULL,
    FOREIGN KEY (roleId) REFERENCES [Role](id) ON DELETE CASCADE,
    FOREIGN KEY (permissionId) REFERENCES [Permission](id) ON DELETE CASCADE,
    UNIQUE (roleId, permissionId)
);

-- =====================================================
-- USER MODULE
-- =====================================================

-- 4.User
CREATE TABLE [User] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    roleId UUID REFERENCES Role(id),
    username NVARCHAR(100) NOT NULL UNIQUE,
    password NVARCHAR(255) NOT NULL,
    name NVARCHAR(200),
    email NVARCHAR(255) UNIQUE,
    avatar TEXT,
    phone NVARCHAR(20),
    gender NVARCHAR(20),
    role NVARCHAR(50),
    address TEXT,
    point INTEGER DEFAULT 0,
    description TEXT,
    dateOfBirth DATE,
    licenseType NVARCHAR(50),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 5.Payment
CREATE TABLE [Payment] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    userId UUID REFERENCES [User](id) ON DELETE CASCADE,
    method NVARCHAR(100),
    amount DECIMAL(10, 2),
    note TEXT,
    response TEXT,
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- =====================================================
-- SIMULATION MODULE
-- =====================================================

-- 6.SimulationChapter
CREATE TABLE [SimulationChapter] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name        NVARCHAR(255) NOT NULL UNIQUE,
    description NVARCHAR(255),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 7.SimulationCategory
CREATE TABLE [SimulationCategory] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name        NVARCHAR(255) NOT NULL UNIQUE,
    description NVARCHAR(255),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 8.SimulationDifficultyLevel
CREATE TABLE [SimulationDifficultyLevel] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name        NVARCHAR(255) NOT NULL UNIQUE,
    description NVARCHAR(255),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 9.SimulationScenario
CREATE TABLE [SimulationScenario] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    simulationChapterId UUID REFERENCES SimulationChapter(id),
    simulationCategoryId UUID REFERENCES SimulationCategory(id),
    simulationDifficultyLevelId UUID REFERENCES SimulationDifficultyLevel(id),
    name NVARCHAR(200) NOT NULL,
    description TEXT,
    video TEXT,
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 10.SimulationSession
CREATE TABLE [SimulationSession] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    simulationId UUID REFERENCES SimulationScenario(id),
    userId UUID REFERENCES [User](id),
    durationSecond INTEGER,
    score INTEGER,
    isPassed BOOLEAN DEFAULT FALSE,
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- =====================================================
-- QUESTION MODULE
-- =====================================================

-- 11.QuestionChapter
CREATE TABLE [QuestionChapter] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name        NVARCHAR(255) NOT NULL UNIQUE,
    description NVARCHAR(255),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 12.QuestionCategory
CREATE TABLE [QuestionCategory] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name        NVARCHAR(255) NOT NULL UNIQUE,
    description NVARCHAR(255),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 13.QuestionDifficultyLevel
CREATE TABLE [QuestionDifficultyLevel] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name        NVARCHAR(255) NOT NULL UNIQUE,
    description NVARCHAR(255),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 14.Question
CREATE TABLE [Question] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    questionId UUID REFERENCES Question(id),
    questionCategoryId UUID REFERENCES QuestionCategory(id),
    questionDifficultyLevelId UUID REFERENCES QuestionDifficultyLevel(id),
    content TEXT NOT NULL,
    image TEXT,
    explanation TEXT,
    isSingleAnswer BOOLEAN DEFAULT TRUE,
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 15.Tag
CREATE TABLE [Tag] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name        NVARCHAR(255) NOT NULL UNIQUE,
    description NVARCHAR(255),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
    colorCode   NVARCHAR(255) NOT NULL UNIQUE,
);

-- 16.QuestionTag
CREATE TABLE [QuestionTag] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    questionId UUID REFERENCES Question(id) ON DELETE CASCADE,
    tagId UUID REFERENCES Tag(id) ON DELETE CASCADE,
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 17.SavedQuestion
CREATE TABLE [SavedQuestion] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    userId UUID REFERENCES [User](id) ON DELETE CASCADE,
    questionId UUID REFERENCES Question(id) ON DELETE CASCADE,
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1,
    UNIQUE(userId, questionId)
);

-- 18.LearningProgress
CREATE TABLE [LearningProgress] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    userId UUID REFERENCES [User](id) ON DELETE CASCADE,
    questionId UUID REFERENCES Question(id) ON DELETE CASCADE,
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1,
    UNIQUE(userId, questionId)
);

-- 19.Answer
CREATE TABLE [Answer] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    questionId UUID REFERENCES Question(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    isCorrect BOOLEAN DEFAULT FALSE,
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- =====================================================
-- EXAM MODULE
-- =====================================================

-- 20.Exam
CREATE TABLE [Exam] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    userId UUID REFERENCES [User](id),
    title NVARCHAR(200),
    description TEXT,
    ownDone INTEGER DEFAULT 0,
    totalQuestion INTEGER,
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 21.ExamQuestion
CREATE TABLE [ExamQuestion] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    eventId UUID REFERENCES Event(id) ON DELETE CASCADE,
    questionId UUID REFERENCES Question(id),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 22.ExamSession
CREATE TABLE [ExamSession] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    examId UUID REFERENCES Exam(id) ON DELETE CASCADE,
    userId UUID REFERENCES [User](id),
    score INTEGER,
    isPassed BOOLEAN DEFAULT FALSE,
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 23.ExamDetail
CREATE TABLE [ExamDetail] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    examSessionId UUID REFERENCES ExamSession(id) ON DELETE CASCADE,
    questionId UUID REFERENCES Question(id),
    userAnswerId UUID,
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- =====================================================
-- FORUM MODULE
-- =====================================================

-- 24.ForumTopic
CREATE TABLE [ForumTopic] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name        NVARCHAR(255) NOT NULL UNIQUE,
    description NVARCHAR(255),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 25.ForumPost
CREATE TABLE [ForumPost] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    forumTopicId UUID REFERENCES ForumTopic(id),
    userId UUID REFERENCES [User](id),
    name NVARCHAR(200),
    title NVARCHAR(300),
    content TEXT,
    viewCount INTEGER DEFAULT 0,
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 26.ForumComment
CREATE TABLE [ForumComment] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    replyId UUID REFERENCES ForumComment(id),
    forumPostId UUID REFERENCES ForumPost(id) ON DELETE CASCADE,
    userId UUID REFERENCES [User](id),
    content TEXT NOT NULL,
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- =====================================================
-- TRAFFIC SIGN MODULE
-- =====================================================

-- 27.SignCategory
CREATE TABLE [SignCategory] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name        NVARCHAR(255) NOT NULL UNIQUE,
    description NVARCHAR(255),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 28.TrafficSign
CREATE TABLE [TrafficSign] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    trafficSignCategoryId UUID REFERENCES TrafficSignCategory(id),
    name NVARCHAR(200),
    description TEXT,
    image TEXT,
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 29.SavedTrafficSign
CREATE TABLE [SavedTrafficSign] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    starCategoryId UUID REFERENCES StarCategory(id),
    name NVARCHAR(100),
    code NVARCHAR(50),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- =====================================================
-- REPORT MODULE
-- =====================================================

-- 30.ReportCategory
CREATE TABLE [ReportCategory] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name        NVARCHAR(255) NOT NULL UNIQUE,
    description NVARCHAR(255),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 31.Report
CREATE TABLE [Report] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    questionId UUID REFERENCES Question(id),
    reportCategoryId UUID REFERENCES ReportCategory(id),
    simulationId UUID REFERENCES SimulationScenario(id),
    userId UUID REFERENCES [User](id),
    title NVARCHAR(200),
    content TEXT,
    image TEXT,
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 32.Resolve
CREATE TABLE [Resolve] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    reportId UUID REFERENCES Report(id) ON DELETE CASCADE,
    title NVARCHAR(200),
    content TEXT,
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- =====================================================
-- NOTIFICATION MODULE
-- =====================================================

-- 33.Notification
CREATE TABLE [Notification] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    title       NVARCHAR(255) NOT NULL,
    content     NVARCHAR(255),
    image       NVARCHAR(255),
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

-- 34.UserNotification
CREATE TABLE [UserNotification] (
    id          UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    notificationId UUID REFERENCES Notification(id) ON DELETE CASCADE,
    userId UUID REFERENCES [User](id) ON DELETE CASCADE,
    createAt    DATETIME2 DEFAULT GETDATE(),
    updateAt    DATETIME2 DEFAULT GETDATE(),
    status      INT DEFAULT 1
);

INSERT INTO [Role] VALUES
(N'Admin',      N'Manage system and users', 1),
(N'Instructor', N'Manage questions bank, simulations, exams, forum, ...', 1),
(N'Student',    N'Student of the system', 1);

SELECT * FROM [Role]