"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagination = void 0;
const getPagination = (page, limit) => {
    const currentPage = Math.max(page, 1); // Ensures page is at least 1
    const perPage = Math.max(limit, 1); // Ensures limit is at least 1
    const skip = (currentPage - 1) * perPage;
    return { skip, take: perPage };
};
exports.getPagination = getPagination;
