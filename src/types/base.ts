export declare type Nullable<T> = T | null

export interface IDisposable {
    dispose(): void
}

export declare type SplitTime = {
    hours: number
    minutes: number
}

export type StatusLevel = 'error' | 'warn' | 'info' | 'success' | null
