import * as v from 'valibot';

export const UserSchema = v.object({
    id: v.string(),
    email: v.string(),
    name: v.string(),
    phone: v.optional(v.string()),
    role: v.picklist(['USER', 'ADMIN', 'SUPER_ADMIN']),
    profilePhotoUrl: v.optional(v.string()),
    isActive: v.boolean(),
    lastLoginAt: v.optional(v.string()),
    marketingAgreed: v.boolean()
})

export const UserListSchema = v.object({
    content: v.array(
        v.object({
            id: v.string(),
            email: v.string(),
            name: v.string(),
            role: v.picklist(['USER', 'ADMIN', 'SUPER_ADMIN']),
            isActive: v.boolean(),
            lastLoginAt: v.nullable(v.string()),
            createdAt: v.string()
        })
    ),
    page: v.object({
        size: v.number(),
        number: v.number(),
        totalElements: v.number(),
        totalPages: v.number()
    })
})

export const TokenSchema = v.object({
    tokenType: v.string(),
    accessToken: v.string(),
    accessTokenExpiresIn: v.number(),
    refreshToken: v.string(),
    refreshTokenExpiresIn: v.number(),
})
