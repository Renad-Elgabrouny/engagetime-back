import { z } from 'zod';
import mongoose from 'mongoose';


const baseActivityFields = {
    sessionId: z.instanceof(mongoose.Types.ObjectId).or(z.string()).optional(),
    question: z.string().min(1, 'Question is required').max(500, 'Question cannot exceed 500 characters'),
    description: z.string().max(1000, 'Description cannot exceed 1000 characters').optional(),
    isQuiz: z.boolean().default(false),
    status: z.enum(['start', 'pause']).default('start'),
};


const activitySchemas = {

    mcq: z.object({
        ...baseActivityFields,
        type: z.literal('mcq'),
        options: z.array(z.string()).min(2, 'MCQ requires at least 2 options').max(6, 'MCQ cannot have more than 6 options'),
        correctAnswer: z.number().int().optional(),
        minRating: z.undefined(),
        MaxRating: z.undefined(),
    }).refine(data => { 
        if (data.isQuiz && data.correctAnswer !== undefined) {
            return data.correctAnswer >= 0 && data.correctAnswer < data.options.length;
        }
        return true;
    }, {
        message: 'Correct answer must be a valid option index (0 to options.length-1)',
        path: ['correctAnswer']
    }),


    yesno: z.object({
        ...baseActivityFields,
        type: z.literal('yesno'),
        options: z.undefined(),
        correctAnswer: z.enum(['yes', 'no']).optional(),
        minRating: z.undefined(),
        MaxRating: z.undefined(),
    }),


    opentext: z.object({
        ...baseActivityFields,
        type: z.literal('opentext'),
        options: z.undefined(),
        correctAnswer: z.string().min(1, 'Correct answer cannot be empty').optional(),
        minRating: z.undefined(),
        MaxRating: z.undefined(),
    }),


    rating: z.object({
        ...baseActivityFields,
        type: z.literal('rating'),
        options: z.undefined(),
        minRating: z.number().min(1, 'minRating must be at least 1').max(10, 'minRating cannot exceed 10').default(1),
        MaxRating: z.number().min(1, 'MaxRating must be at least 1').max(10, 'MaxRating cannot exceed 10').default(5),
        correctAnswer: z.number().int().optional(),
    }).refine(data => data.MaxRating > data.minRating, {
        message: 'MaxRating must be greater than minRating',
        path: ['MaxRating']
    }).refine(data => {
        // If it's a quiz and has a correct answer, validate it's within rating range
        if (data.isQuiz && data.correctAnswer !== undefined) {
            return data.correctAnswer >= data.minRating && data.correctAnswer <= data.MaxRating;
        }
        return true;
    }, {
        message: (data) => `Correct answer must be between ${data.minRating} and ${data.MaxRating}`,
        path: ['correctAnswer']
    }),
};


export const validateActivity = (activityData) => {
    const { type } = activityData;
    
    if (!type) {
        return {
            success: false,
            error: 'Activity type is required',
            details: null
        };
    }
    
    const schema = activitySchemas[type];
    if (!schema) {
        return {
            success: false,
            error: `Invalid activity type: ${type}. Must be one of: mcq, yesno, opentext, rating`,
            details: null
        };
    }
    
    const result = schema.safeParse(activityData);
    
    if (!result.success) {
        const formattedErrors = result.error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message
        }));
        
        return {
            success: false,
            error: 'Validation failed',
            details: formattedErrors
        };
    }
    
    return {
        success: true,
        data: result.data,
        error: null,
        details: null
    };
};


export const validateCorrectAnswer = (type, isQuiz, correctAnswer, context = {}) => {
    if (!isQuiz) return { success: true };
    
    switch(type) {
        case 'mcq':
            const optionsLength = context.optionsLength || 0;
            const result = z.number().int()
                .min(0, 'Correct answer must be at least 0')
                .max(optionsLength - 1, `Correct answer must be between 0 and ${optionsLength - 1}`)
                .safeParse(correctAnswer);
            return {
                success: result.success,
                error: result.success ? null : result.error.errors[0].message
            };
            
        case 'yesno':
            const yesnoResult = z.enum(['yes', 'no']).safeParse(correctAnswer);
            return {
                success: yesnoResult.success,
                error: yesnoResult.success ? null : 'Correct answer must be "yes" or "no"'
            };
            
        case 'opentext':
            const textResult = z.string().min(1, 'Correct answer cannot be empty').safeParse(correctAnswer);
            return {
                success: textResult.success,
                error: textResult.success ? null : textResult.error.errors[0].message
            };
            
        case 'rating':
            const ratingResult = z.number().int()
                .min(context.minRating || 1, `Correct answer must be at least ${context.minRating || 1}`)
                .max(context.MaxRating || 5, `Correct answer must be at most ${context.MaxRating || 5}`)
                .safeParse(correctAnswer);
            return {
                success: ratingResult.success,
                error: ratingResult.success ? null : ratingResult.error.errors[0].message
            };
            
        default:
            return {
                success: false,
                error: 'Invalid activity type'
            };
    }
};