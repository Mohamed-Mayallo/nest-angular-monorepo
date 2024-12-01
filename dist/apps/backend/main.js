/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const auth_module_1 = __webpack_require__(5);
const mongoose_1 = __webpack_require__(10);
const config_1 = __webpack_require__(17);
const throttler_1 = __webpack_require__(18);
const current_user_middleware_1 = __webpack_require__(19);
const posts_module_1 = __webpack_require__(21);
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(current_user_middleware_1.CurrentUserMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            throttler_1.ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    uri: configService.getOrThrow('DB_URL'),
                }),
                inject: [config_1.ConfigService],
            }),
            auth_module_1.AuthModule,
            posts_module_1.PostsModule,
            config_1.ConfigModule.forRoot({ envFilePath: `${process.cwd()}/../../../.env` }),
        ],
    })
], AppModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const auth_controller_1 = __webpack_require__(6);
const auth_service_1 = __webpack_require__(7);
const mongoose_1 = __webpack_require__(10);
const jwt_1 = __webpack_require__(11);
const config_1 = __webpack_require__(17);
const types_1 = __webpack_require__(12);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    global: true,
                    secret: configService.getOrThrow('JWT_SECRET'),
                    signOptions: { expiresIn: '8h' },
                }),
                inject: [config_1.ConfigService],
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: types_1.User.name, schema: types_1.UserSchema },
                { name: types_1.Verification.name, schema: types_1.VerificationSchema },
            ]),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService],
        exports: [jwt_1.JwtModule, mongoose_1.MongooseModule],
    })
], AuthModule);


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const auth_service_1 = __webpack_require__(7);
const types_1 = __webpack_require__(12);
let AuthController = class AuthController {
    register(body) {
        return this.authService.register(body);
    }
    login(body) {
        return this.authService.login(body);
    }
    sendVerificationCode(body) {
        return this.authService.sendVerificationCode(body);
    }
    forgetPassword(body) {
        return this.authService.forgetPassword(body);
    }
};
exports.AuthController = AuthController;
tslib_1.__decorate([
    (0, common_1.Inject)(auth_service_1.AuthService),
    tslib_1.__metadata("design:type", typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object)
], AuthController.prototype, "authService", void 0);
tslib_1.__decorate([
    (0, common_1.Post)('/register'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof types_1.RegisterDto !== "undefined" && types_1.RegisterDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AuthController.prototype, "register", null);
tslib_1.__decorate([
    (0, common_1.Post)('/login'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof types_1.LoginDto !== "undefined" && types_1.LoginDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], AuthController.prototype, "login", null);
tslib_1.__decorate([
    (0, common_1.Post)('/send-verification-code'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof types_1.SendVerificationCodeDto !== "undefined" && types_1.SendVerificationCodeDto) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], AuthController.prototype, "sendVerificationCode", null);
tslib_1.__decorate([
    (0, common_1.Patch)('/forget-password'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof types_1.ForgetPasswordDto !== "undefined" && types_1.ForgetPasswordDto) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", typeof (_j = typeof Promise !== "undefined" && Promise) === "function" ? _j : Object)
], AuthController.prototype, "forgetPassword", null);
exports.AuthController = AuthController = tslib_1.__decorate([
    (0, common_1.Controller)('auth')
], AuthController);


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__(4);
const argon = tslib_1.__importStar(__webpack_require__(8));
const mongoose_1 = __webpack_require__(9);
const common_1 = __webpack_require__(1);
const mongoose_2 = __webpack_require__(10);
const jwt_1 = __webpack_require__(11);
const types_1 = __webpack_require__(12);
let AuthService = class AuthService {
    constructor(jwtService, userModel, verificationModel) {
        this.jwtService = jwtService;
        this.userModel = userModel;
        this.verificationModel = verificationModel;
    }
    async login(input) {
        const user = await this.getUserByEmailOrThrow(input.email);
        await this.passwordMustBeMatched(user.password, input.password);
        const userDoc = user.toJSON();
        delete userDoc.password;
        return { ...userDoc, token: await this.generateJwtToken(user) };
    }
    async register(input) {
        await this.userMustNotBeDuplicated(input.email);
        const user = await this.userModel.create({
            name: input.name,
            email: input.email.toLowerCase(),
            password: await this.hashPass(input.password),
        }), userDoc = user.toJSON();
        delete userDoc.password;
        return { ...userDoc, token: await this.generateJwtToken(user) };
    }
    async sendVerificationCode(input) {
        await this.deleteOldVerificationCodes(input.email);
        await this.getUserByEmailOrThrow(input.email);
        await this.shareCode(input.email);
    }
    async forgetPassword(input) {
        const verification = await this.verificationModel
            .findOne({
            email: input.email.toLowerCase(),
            verificationCode: input.verificationCode,
        })
            .sort('-createdAt');
        this.validateVerificationCode(verification);
        const user = await this.getUserByEmailOrThrow(input.email);
        user.password = await this.hashPass(input.newPassword);
        await user.save();
        const userDoc = user.toJSON();
        delete userDoc.password;
        return { ...userDoc, token: await this.generateJwtToken(user) };
    }
    async userMustNotBeDuplicated(email) {
        const user = await this.getUserByEmail(email);
        if (user) {
            throw new common_1.ConflictException('User already exists!');
        }
    }
    async getUserByEmail(email) {
        const user = await this.userModel.findOne({ email: email.toLowerCase() });
        return user;
    }
    async getUserByEmailOrThrow(email) {
        const user = await this.getUserByEmail(email);
        if (!user) {
            throw new common_1.ConflictException('User does not exist!');
        }
        return user;
    }
    async passwordMustBeMatched(hash, password) {
        const isPassMatched = await argon.verify(hash, password);
        if (!isPassMatched) {
            throw new common_1.ConflictException('Password is wrong!');
        }
    }
    async hashPass(password) {
        return await argon.hash(password);
    }
    async generateJwtToken(user) {
        const token = await this.jwtService.signAsync({ id: user._id });
        return `Bearer ${token}`;
    }
    async deleteOldVerificationCodes(email) {
        await this.verificationModel.deleteMany({ email: email.toLowerCase() });
    }
    async shareCode(email) {
        const verificationCode = '1234', expiryDateAfterOneHour = new Date(Date.now() + 3600000);
        const verification = await this.verificationModel.create({
            email: email.toLowerCase(),
            verificationCode,
            expiryDate: expiryDateAfterOneHour,
        });
        await verification.save();
        // Send actual email including this verification code
    }
    validateVerificationCode(verification) {
        if (!verification) {
            throw new common_1.ConflictException('This verification code does not exist!');
        }
        if (verification.expiryDate < new Date()) {
            throw new common_1.ConflictException('This verification code already expired!');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(1, (0, mongoose_2.InjectModel)(types_1.User.name)),
    tslib_1.__param(2, (0, mongoose_2.InjectModel)(types_1.Verification.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _b : Object, typeof (_c = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _c : Object])
], AuthService);


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("argon2");

/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),
/* 10 */
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(4);
tslib_1.__exportStar(__webpack_require__(13), exports);
tslib_1.__exportStar(__webpack_require__(14), exports);
tslib_1.__exportStar(__webpack_require__(15), exports);
tslib_1.__exportStar(__webpack_require__(16), exports);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ForgetPasswordDto = exports.SendVerificationCodeDto = void 0;
class SendVerificationCodeDto {
}
exports.SendVerificationCodeDto = SendVerificationCodeDto;
class ForgetPasswordDto {
}
exports.ForgetPasswordDto = ForgetPasswordDto;


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSchema = exports.User = void 0;
const tslib_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(10);
let User = class User {
};
exports.User = User;
tslib_1.__decorate([
    (0, mongoose_1.Prop)(String),
    tslib_1.__metadata("design:type", String)
], User.prototype, "name", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(String),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(String),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
exports.User = User = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VerificationSchema = exports.Verification = void 0;
const tslib_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(10);
let Verification = class Verification {
};
exports.Verification = Verification;
tslib_1.__decorate([
    (0, mongoose_1.Prop)(String),
    tslib_1.__metadata("design:type", String)
], Verification.prototype, "email", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(String),
    tslib_1.__metadata("design:type", String)
], Verification.prototype, "verificationCode", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(Date),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Verification.prototype, "expiryDate", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(Date),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Verification.prototype, "createdAt", void 0);
exports.Verification = Verification = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Verification);
exports.VerificationSchema = mongoose_1.SchemaFactory.createForClass(Verification);


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostSchema = exports.Post = void 0;
const tslib_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(10);
const mongoose_2 = __webpack_require__(9);
const user_model_1 = __webpack_require__(14);
let Post = class Post {
};
exports.Post = Post;
tslib_1.__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Types.ObjectId, ref: 'User' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof user_model_1.User !== "undefined" && user_model_1.User) === "function" ? _a : Object)
], Post.prototype, "author", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(String),
    tslib_1.__metadata("design:type", String)
], Post.prototype, "title", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(String),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "content", void 0);
tslib_1.__decorate([
    (0, mongoose_1.Prop)(Date),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Post.prototype, "createdAt", void 0);
exports.Post = Post = tslib_1.__decorate([
    (0, mongoose_1.Schema)()
], Post);
exports.PostSchema = mongoose_1.SchemaFactory.createForClass(Post);


/***/ }),
/* 17 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 18 */
/***/ ((module) => {

module.exports = require("@nestjs/throttler");

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CurrentUserMiddleware = void 0;
const tslib_1 = __webpack_require__(4);
const mongodb_1 = __webpack_require__(20);
const mongoose_1 = __webpack_require__(9);
const types_1 = __webpack_require__(12);
const common_1 = __webpack_require__(1);
const jwt_1 = __webpack_require__(11);
const mongoose_2 = __webpack_require__(10);
const config_1 = __webpack_require__(17);
let CurrentUserMiddleware = class CurrentUserMiddleware {
    constructor(config, jwtService, userModel) {
        this.config = config;
        this.jwtService = jwtService;
        this.userModel = userModel;
    }
    async use(req, _, next) {
        const token = req.headers.authorization;
        if (!token || !token.match(/^Bearer /))
            return next();
        const currentUser = await this.getUser(token);
        req.user = currentUser;
        return next();
    }
    async getUser(token) {
        const { id } = this.jwtService.verify(token.replace(/^Bearer /, ''), {
            ...(this.config.getOrThrow('NODE_ENV') === 'development' && {
                ignoreExpiration: true,
            }),
        });
        return await this.userModel.findById(mongodb_1.ObjectId.createFromHexString(id));
    }
};
exports.CurrentUserMiddleware = CurrentUserMiddleware;
exports.CurrentUserMiddleware = CurrentUserMiddleware = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(2, (0, mongoose_2.InjectModel)(types_1.User.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object, typeof (_c = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _c : Object])
], CurrentUserMiddleware);


/***/ }),
/* 20 */
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostsModule = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const mongoose_1 = __webpack_require__(10);
const types_1 = __webpack_require__(12);
const posts_service_1 = __webpack_require__(22);
const posts_controller_1 = __webpack_require__(23);
let PostsModule = class PostsModule {
};
exports.PostsModule = PostsModule;
exports.PostsModule = PostsModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: types_1.Post.name, schema: types_1.PostSchema }]),
        ],
        controllers: [posts_controller_1.PostsController],
        providers: [posts_service_1.PostsService],
    })
], PostsModule);


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostsService = void 0;
const tslib_1 = __webpack_require__(4);
const mongoose_1 = __webpack_require__(9);
const types_1 = __webpack_require__(12);
const common_1 = __webpack_require__(1);
const mongoose_2 = __webpack_require__(10);
let PostsService = class PostsService {
    constructor(postModel) {
        this.postModel = postModel;
    }
    async getPosts(author) {
        return await this.postModel.find({ author: author._id });
    }
    async createPost(author, input) {
        const post = await this.postModel.create({
            title: input.title,
            content: input.content,
            author,
        }), postDoc = post.toJSON();
        return postDoc;
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_2.InjectModel)(types_1.Post.name)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object])
], PostsService);


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostsController = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
const current_user_decorator_1 = __webpack_require__(24);
const posts_service_1 = __webpack_require__(22);
const auth_guard_1 = __webpack_require__(25);
const types_1 = __webpack_require__(12);
let PostsController = class PostsController {
    getPosts(user) {
        return this.postsService.getPosts(user);
    }
    createPost(user, body) {
        return this.postsService.createPost(user, body);
    }
};
exports.PostsController = PostsController;
tslib_1.__decorate([
    (0, common_1.Inject)(posts_service_1.PostsService),
    tslib_1.__metadata("design:type", typeof (_a = typeof posts_service_1.PostsService !== "undefined" && posts_service_1.PostsService) === "function" ? _a : Object)
], PostsController.prototype, "postsService", void 0);
tslib_1.__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    tslib_1.__param(0, (0, current_user_decorator_1.CurrentUser)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof types_1.User !== "undefined" && types_1.User) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], PostsController.prototype, "getPosts", null);
tslib_1.__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    tslib_1.__param(0, (0, current_user_decorator_1.CurrentUser)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof types_1.User !== "undefined" && types_1.User) === "function" ? _d : Object, typeof (_e = typeof types_1.CreatePostDto !== "undefined" && types_1.CreatePostDto) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], PostsController.prototype, "createPost", null);
exports.PostsController = PostsController = tslib_1.__decorate([
    (0, common_1.Controller)('posts')
], PostsController);


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CurrentUser = void 0;
const common_1 = __webpack_require__(1);
exports.CurrentUser = (0, common_1.createParamDecorator)((field, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const currentUser = request.user;
    if (!currentUser)
        return false;
    return field ? currentUser[field] : currentUser;
});


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthGuard = void 0;
const tslib_1 = __webpack_require__(4);
const common_1 = __webpack_require__(1);
let AuthGuard = class AuthGuard {
    async canActivate(context) {
        const request = context
            .switchToHttp()
            .getRequest();
        const currentUser = request.user;
        if (!currentUser) {
            throw new common_1.UnauthorizedException('Unauthenticated!');
        }
        return true;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AuthGuard);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const app_module_1 = __webpack_require__(3);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({ origin: '*' });
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();

})();

/******/ })()
;