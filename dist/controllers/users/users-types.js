"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserByIdError = exports.GetAllUsersError = exports.GetMeError = void 0;
var GetMeError;
(function (GetMeError) {
    GetMeError["USER_NOT_FOUND"] = "USER_NOT_FOUND";
    GetMeError["UNKNOWN"] = "UNKNOWN";
})(GetMeError || (exports.GetMeError = GetMeError = {}));
var GetAllUsersError;
(function (GetAllUsersError) {
    GetAllUsersError["NO_USERS_FOUND"] = "NO_USERS_FOUND";
    GetAllUsersError["UNKNOWN"] = "UNKNOWN";
})(GetAllUsersError || (exports.GetAllUsersError = GetAllUsersError = {}));
var GetUserByIdError;
(function (GetUserByIdError) {
    GetUserByIdError["USER_NOT_FOUND"] = "USER_NOT_FOUND";
    GetUserByIdError["UNKNOWN"] = "UNKNOWN";
})(GetUserByIdError || (exports.GetUserByIdError = GetUserByIdError = {}));
