--USE MASTER

--DROP DATABASE GreenLight


--CREATE DATABASE GreenLight

--USE Xnova

IF OBJECT_ID('dbo.[UserNotification]', 'U') IS NOT NULL
    DROP TABLE dbo.[UserNotification];
    GO
IF OBJECT_ID('dbo.[Notification]', 'U') IS NOT NULL
    DROP TABLE dbo.[Notification];
    GO
IF OBJECT_ID('dbo.[aaaaaaaaaaaaaaaaaaaaaaa]', 'U') IS NOT NULL
    DROP TABLE dbo.[aaaaaaaaaaaaaaaaaaaaaaa];
    GO
IF OBJECT_ID('dbo.[aaaaaaaaaaaaaaaaaaaaaaa]', 'U') IS NOT NULL
    DROP TABLE dbo.[aaaaaaaaaaaaaaaaaaaaaaa];
    GO
IF OBJECT_ID('dbo.[aaaaaaaaaaaaaaaaaaaaaaa]', 'U') IS NOT NULL
    DROP TABLE dbo.[aaaaaaaaaaaaaaaaaaaaaaa];
    GO
IF OBJECT_ID('dbo.[aaaaaaaaaaaaaaaaaaaaaaa]', 'U') IS NOT NULL
    DROP TABLE dbo.[aaaaaaaaaaaaaaaaaaaaaaa];
    GO
IF OBJECT_ID('dbo.[aaaaaaaaaaaaaaaaaaaaaaa]', 'U') IS NOT NULL
    DROP TABLE dbo.[aaaaaaaaaaaaaaaaaaaaaaa];
    GO
IF OBJECT_ID('dbo.[aaaaaaaaaaaaaaaaaaaaaaa]', 'U') IS NOT NULL
    DROP TABLE dbo.[aaaaaaaaaaaaaaaaaaaaaaa];
    GO
IF OBJECT_ID('dbo.[aaaaaaaaaaaaaaaaaaaaaaa]', 'U') IS NOT NULL
    DROP TABLE dbo.[aaaaaaaaaaaaaaaaaaaaaaa];
    GO
IF OBJECT_ID('dbo.[aaaaaaaaaaaaaaaaaaaaaaa]', 'U') IS NOT NULL
    DROP TABLE dbo.[aaaaaaaaaaaaaaaaaaaaaaa];
    GO
IF OBJECT_ID('dbo.[aaaaaaaaaaaaaaaaaaaaaaa]', 'U') IS NOT NULL
    DROP TABLE dbo.[aaaaaaaaaaaaaaaaaaaaaaa];
    GO
IF OBJECT_ID('dbo.[aaaaaaaaaaaaaaaaaaaaaaa]', 'U') IS NOT NULL
    DROP TABLE dbo.[aaaaaaaaaaaaaaaaaaaaaaa];
    GO
IF OBJECT_ID('dbo.[aaaaaaaaaaaaaaaaaaaaaaa]', 'U') IS NOT NULL
    DROP TABLE dbo.[aaaaaaaaaaaaaaaaaaaaaaa];
    GO
IF OBJECT_ID('dbo.[aaaaaaaaaaaaaaaaaaaaaaa]', 'U') IS NOT NULL
    DROP TABLE dbo.[aaaaaaaaaaaaaaaaaaaaaaa];
    GO
IF OBJECT_ID('dbo.[aaaaaaaaaaaaaaaaaaaaaaa]', 'U') IS NOT NULL
    DROP TABLE dbo.[aaaaaaaaaaaaaaaaaaaaaaa];
    GO
IF OBJECT_ID('dbo.[aaaaaaaaaaaaaaaaaaaaaaa]', 'U') IS NOT NULL
    DROP TABLE dbo.[aaaaaaaaaaaaaaaaaaaaaaa];
    GO
IF OBJECT_ID('dbo.[aaaaaaaaaaaaaaaaaaaaaaa]', 'U') IS NOT NULL
    DROP TABLE dbo.[aaaaaaaaaaaaaaaaaaaaaaa];
    GO
IF OBJECT_ID('dbo.[aaaaaaaaaaaaaaaaaaaaaaa]', 'U') IS NOT NULL
    DROP TABLE dbo.[aaaaaaaaaaaaaaaaaaaaaaa];
    GO
IF OBJECT_ID('dbo.[aaaaaaaaaaaaaaaaaaaaaaa]', 'U') IS NOT NULL
    DROP TABLE dbo.[aaaaaaaaaaaaaaaaaaaaaaa];
    GO
IF OBJECT_ID('dbo.[aaaaaaaaaaaaaaaaaaaaaaa]', 'U') IS NOT NULL
    DROP TABLE dbo.[aaaaaaaaaaaaaaaaaaaaaaa];
    GO
IF OBJECT_ID('dbo.[aaaaaaaaaaaaaaaaaaaaaaa]', 'U') IS NOT NULL
    DROP TABLE dbo.[aaaaaaaaaaaaaaaaaaaaaaa];
    GO
IF OBJECT_ID('dbo.[aaaaaaaaaaaaaaaaaaaaaaa]', 'U') IS NOT NULL
    DROP TABLE dbo.[aaaaaaaaaaaaaaaaaaaaaaa];
    GO
IF OBJECT_ID('dbo.[aaaaaaaaaaaaaaaaaaaaaaa]', 'U') IS NOT NULL
    DROP TABLE dbo.[aaaaaaaaaaaaaaaaaaaaaaa];
    GO
IF OBJECT_ID('dbo.[aaaaaaaaaaaaaaaaaaaaaaa]', 'U') IS NOT NULL
    DROP TABLE dbo.[aaaaaaaaaaaaaaaaaaaaaaa];
    GO
IF OBJECT_ID('dbo.[aaaaaaaaaaaaaaaaaaaaaaa]', 'U') IS NOT NULL
    DROP TABLE dbo.[aaaaaaaaaaaaaaaaaaaaaaa];
    GO
IF OBJECT_ID('dbo.[aaaaaaaaaaaaaaaaaaaaaaa]', 'U') IS NOT NULL
    DROP TABLE dbo.[aaaaaaaaaaaaaaaaaaaaaaa];
    GO
IF OBJECT_ID('dbo.[aaaaaaaaaaaaaaaaaaaaaaa]', 'U') IS NOT NULL
    DROP TABLE dbo.[aaaaaaaaaaaaaaaaaaaaaaa];
    GO
IF OBJECT_ID('dbo.[aaaaaaaaaaaaaaaaaaaaaaa]', 'U') IS NOT NULL
    DROP TABLE dbo.[aaaaaaaaaaaaaaaaaaaaaaa];
    GO
IF OBJECT_ID('dbo.[aaaaaaaaaaaaaaaaaaaaaaa]', 'U') IS NOT NULL
    DROP TABLE dbo.[aaaaaaaaaaaaaaaaaaaaaaa];
    GO
IF OBJECT_ID('dbo.[aaaaaaaaaaaaaaaaaaaaaaa]', 'U') IS NOT NULL
    DROP TABLE dbo.[aaaaaaaaaaaaaaaaaaaaaaa];
    GO
IF OBJECT_ID('dbo.[aaaaaaaaaaaaaaaaaaaaaaa]', 'U') IS NOT NULL
    DROP TABLE dbo.[aaaaaaaaaaaaaaaaaaaaaaa];
    GO
IF OBJECT_ID('dbo.[aaaaaaaaaaaaaaaaaaaaaaa]', 'U') IS NOT NULL
    DROP TABLE dbo.[aaaaaaaaaaaaaaaaaaaaaaa];
    GO
IF OBJECT_ID('dbo.[aaaaaaaaaaaaaaaaaaaaaaa]', 'U') IS NOT NULL
    DROP TABLE dbo.[aaaaaaaaaaaaaaaaaaaaaaa];
    GO
IF OBJECT_ID('dbo.[aaaaaaaaaaaaaaaaaaaaaaa]', 'U') IS NOT NULL
    DROP TABLE dbo.[aaaaaaaaaaaaaaaaaaaaaaa];
    GO


-- =====================================================
-- AUTH MODULE
-- =====================================================

-- 1.Role
CREATE TABLE [Role] (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            NVARCHAR(100) NOT NULL UNIQUE,
    description     TEXT,
    createAt        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status          INTEGER DEFAULT 1
);

-- 2.Permission
CREATE TABLE [Permission] (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            NVARCHAR(100) NOT NULL,
    description     TEXT,
    createAt        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status          INTEGER DEFAULT 1
);

-- 3.RolePermission
CREATE TABLE [RolePermission] (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    roleId          UUID REFERENCES Role(id) ON DELETE CASCADE,
    permissionId    UUID REFERENCES Permission(id) ON DELETE CASCADE,
    createAt        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status          INTEGER DEFAULT 1,
    UNIQUE(roleId, permissionId)
);

-- =====================================================
-- USER MODULE
-- =====================================================

-- 4.User
CREATE TABLE [User] (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
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
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INTEGER DEFAULT 1
);

-- 5.Payment
CREATE TABLE [Payment] (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    userId UUID REFERENCES [User](id) ON DELETE CASCADE,
    method NVARCHAR(100),
    amount DECIMAL(10, 2),
    note TEXT,
    response TEXT,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INTEGER DEFAULT 1
);

-- =====================================================
-- SIMULATION MODULE
-- =====================================================

-- 6.SimulationChapter
CREATE TABLE [SimulationChapter] (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name NVARCHAR(200) NOT NULL,
    description TEXT,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INTEGER DEFAULT 1
);

-- 7.SimulationCategory
CREATE TABLE [SimulationCategory] (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name NVARCHAR(100) NOT NULL,
    description TEXT,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INTEGER DEFAULT 1
);

-- 8.SimulationDifficultyLevel
CREATE TABLE [SimulationDifficultyLevel] (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name NVARCHAR(100) NOT NULL,
    description TEXT,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INTEGER DEFAULT 1
);

-- 9.SimulationScenario
CREATE TABLE [SimulationScenario] (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    simulationChapterId UUID REFERENCES SimulationChapter(id),
    simulationCategoryId UUID REFERENCES SimulationCategory(id),
    simulationDifficultyLevelId UUID REFERENCES SimulationDifficultyLevel(id),
    name NVARCHAR(200) NOT NULL,
    description TEXT,
    video TEXT,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INTEGER DEFAULT 1
);

-- 10.SimulationSession
CREATE TABLE [SimulationSession] (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    simulationId UUID REFERENCES SimulationScenario(id),
    userId UUID REFERENCES [User](id),
    durationSecond INTEGER,
    score INTEGER,
    isPassed BOOLEAN DEFAULT FALSE,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INTEGER DEFAULT 1
);

-- =====================================================
-- QUESTION MODULE
-- =====================================================

-- 11.QuestionChapter
CREATE TABLE [QuestionChapter] (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name NVARCHAR(100) NOT NULL,
    description TEXT,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INTEGER DEFAULT 1
);

-- 12.QuestionCategory
CREATE TABLE [QuestionCategory] (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name NVARCHAR(100) NOT NULL,
    description TEXT,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INTEGER DEFAULT 1
);

-- 13.QuestionDifficultyLevel
CREATE TABLE [QuestionDifficultyLevel] (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name NVARCHAR(100) NOT NULL,
    description TEXT,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INTEGER DEFAULT 1
);

-- 14.Question
CREATE TABLE [Question] (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    questionId UUID REFERENCES Question(id),
    questionCategoryId UUID REFERENCES QuestionCategory(id),
    questionDifficultyLevelId UUID REFERENCES QuestionDifficultyLevel(id),
    content TEXT NOT NULL,
    image TEXT,
    explanation TEXT,
    isSingleAnswer BOOLEAN DEFAULT TRUE,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INTEGER DEFAULT 1
);

-- 15.Tag
CREATE TABLE [Tag] (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name NVARCHAR(100) NOT NULL,
    description TEXT,
    colorCode NVARCHAR(100) NOT NULL,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INTEGER DEFAULT 1
);

-- 16.QuestionTag
CREATE TABLE [QuestionTag] (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    questionId UUID REFERENCES Question(id) ON DELETE CASCADE,
    tagId UUID REFERENCES Tag(id) ON DELETE CASCADE,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INTEGER DEFAULT 1
);

-- 17.SavedQuestion
CREATE TABLE [SavedQuestion] (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    userId UUID REFERENCES [User](id) ON DELETE CASCADE,
    questionId UUID REFERENCES Question(id) ON DELETE CASCADE,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INTEGER DEFAULT 1,
    UNIQUE(userId, questionId)
);

-- 18.LearningProgress
CREATE TABLE [LearningProgress] (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    userId UUID REFERENCES [User](id) ON DELETE CASCADE,
    questionId UUID REFERENCES Question(id) ON DELETE CASCADE,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INTEGER DEFAULT 1,
    UNIQUE(userId, questionId)
);

-- 19.Answer
CREATE TABLE [Answer] (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    questionId UUID REFERENCES Question(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    isCorrect BOOLEAN DEFAULT FALSE,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INTEGER DEFAULT 1
);

-- =====================================================
-- EXAM MODULE
-- =====================================================

-- 20.Exam
CREATE TABLE [Exam] (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    userId UUID REFERENCES [User](id),
    title NVARCHAR(200),
    description TEXT,
    ownDone INTEGER DEFAULT 0,
    totalQuestion INTEGER,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INTEGER DEFAULT 1
);

-- 21.ExamQuestion
CREATE TABLE [ExamQuestion] (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    eventId UUID REFERENCES Event(id) ON DELETE CASCADE,
    questionId UUID REFERENCES Question(id),
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INTEGER DEFAULT 1
);

-- 22.ExamSession
CREATE TABLE [ExamSession] (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    examId UUID REFERENCES Exam(id) ON DELETE CASCADE,
    userId UUID REFERENCES [User](id),
    score INTEGER,
    isPassed BOOLEAN DEFAULT FALSE,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INTEGER DEFAULT 1
);

-- 23.ExamDetail
CREATE TABLE [ExamDetail] (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    examSessionId UUID REFERENCES ExamSession(id) ON DELETE CASCADE,
    questionId UUID REFERENCES Question(id),
    userAnswerId UUID,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INTEGER DEFAULT 1
);

-- =====================================================
-- FORUM MODULE
-- =====================================================

-- 24.ForumTopic
CREATE TABLE [ForumTopic] (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name NVARCHAR(200) NOT NULL,
    description TEXT,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INTEGER DEFAULT 1
);

-- 25.ForumPost
CREATE TABLE [ForumPost] (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    forumTopicId UUID REFERENCES ForumTopic(id),
    userId UUID REFERENCES [User](id),
    name NVARCHAR(200),
    title NVARCHAR(300),
    content TEXT,
    viewCount INTEGER DEFAULT 0,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INTEGER DEFAULT 1
);

-- 26.ForumComment
CREATE TABLE [ForumComment] (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    replyId UUID REFERENCES ForumComment(id),
    forumPostId UUID REFERENCES ForumPost(id) ON DELETE CASCADE,
    userId UUID REFERENCES [User](id),
    content TEXT NOT NULL,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INTEGER DEFAULT 1
);

-- =====================================================
-- TRAFFIC SIGN MODULE
-- =====================================================

-- 27.SignCategory
CREATE TABLE [SignCategory] (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name NVARCHAR(100),
    description TEXT,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INTEGER DEFAULT 1
);

-- 28.TrafficSign
CREATE TABLE [TrafficSign] (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    trafficSignCategoryId UUID REFERENCES TrafficSignCategory(id),
    name NVARCHAR(200),
    description TEXT,
    image TEXT,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INTEGER DEFAULT 1
);

-- 29.SavedTrafficSign
CREATE TABLE [SavedTrafficSign] (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    starCategoryId UUID REFERENCES StarCategory(id),
    name NVARCHAR(100),
    code NVARCHAR(50),
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INTEGER DEFAULT 1
);

-- =====================================================
-- REPORT MODULE
-- =====================================================

-- 30.ReportCategory
CREATE TABLE [ReportCategory] (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name NVARCHAR(100) NOT NULL,
    description TEXT,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INTEGER DEFAULT 1
);

-- 31.Report
CREATE TABLE [Report] (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    questionId UUID REFERENCES Question(id),
    reportCategoryId UUID REFERENCES ReportCategory(id),
    simulationId UUID REFERENCES SimulationScenario(id),
    userId UUID REFERENCES [User](id),
    title NVARCHAR(200),
    content TEXT,
    image TEXT,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INTEGER DEFAULT 1
);

-- 32.Resolve
CREATE TABLE [Resolve] (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reportId UUID REFERENCES Report(id) ON DELETE CASCADE,
    title NVARCHAR(200),
    content TEXT,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INTEGER DEFAULT 1
);

-- =====================================================
-- NOTIFICATION MODULE
-- =====================================================

-- 33.Notification
CREATE TABLE [Notification] (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title NVARCHAR(200) NOT NULL,
    content TEXT,
    image TEXT,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INTEGER DEFAULT 1
);

-- 34.UserNotification
CREATE TABLE [UserNotification] (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    notificationId UUID REFERENCES Notification(id) ON DELETE CASCADE,
    userId UUID REFERENCES [User](id) ON DELETE CASCADE,
    createAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status INTEGER DEFAULT 1
);