import { query, validationResult } from 'express-validator';
import { SUPPORTED_REGIONS } from '../constants.js';

/**
 * Validation middleware for trend query endpoints
 */
export const validateTrendQuery = [
    query('regionCode')
        .optional()
        .isString()
        .isIn(SUPPORTED_REGIONS)
        .withMessage(`Region code must be one of: ${SUPPORTED_REGIONS.join(', ')}`),

    query('categoryId')
        .optional()
        .isString()
        .isLength({ min: 1, max: 10 })
        .withMessage('Category ID must be a string between 1 and 10 characters'),

    query('keyword')
        .optional()
        .isString()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Keyword must be less than 100 characters'),

    query('page')
        .optional()
        .isInt({ min: 1, max: 100 })
        .withMessage('Page must be an integer between 1 and 100'),

    query('limit')
        .optional()
        .isInt({ min: 1, max: 50 })
        .withMessage('Limit must be an integer between 1 and 50'),

    query('sortBy')
        .optional()
        .isIn(['views', 'likes', 'comments'])
        .withMessage('Sort by must be one of: views, likes, comments'),

    query('maxResults')
        .optional()
        .isInt({ min: 1, max: 50 })
        .withMessage('Max results must be an integer between 1 and 50'),

    // Middleware to check validation results
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array().map(err => ({
                    field: err.path,
                    message: err.msg,
                    value: err.value
                }))
            });
        }
        next();
    }
];

/**
 * Validation middleware for category query endpoints
 */
export const validateCategoryQuery = [
    query('regionCode')
        .optional()
        .isString()
        .isIn(SUPPORTED_REGIONS)
        .withMessage(`Region code must be one of: ${SUPPORTED_REGIONS.join(', ')}`),

    // Middleware to check validation results
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array().map(err => ({
                    field: err.path,
                    message: err.msg,
                    value: err.value
                }))
            });
        }
        next();
    }
];
