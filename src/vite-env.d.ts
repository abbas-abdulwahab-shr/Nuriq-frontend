/// <reference types="vite/client" />

declare module '*.jpg'
declare module '*.jpeg'
declare module '*.png'
declare module '*.gif'
declare module '*.svg'
declare module '*.webp'

/**
 * IMPORTANT:
 * This handles any asset import with ANY query string.
 * TS only checks the trailing pattern, not the content.
 */
declare module '*?*'
declare module '*&*'
