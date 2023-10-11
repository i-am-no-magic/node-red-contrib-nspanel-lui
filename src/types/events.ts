import { ActiveCharacteristic, HSVColor, RGBColor } from '.'

export type ValidEventSpec = {
    //FIXME: naming
    event: string
    label: string
}

export declare type EventMapping = {
    event: string
    value: string | null
    t: string | null
    data?: string
    dataType?: string
    icon?: string
    iconColor?: string
}

export interface EventArgs {
    type: string
    date?: Date

    source: string
    event: string
    event2?: string
    entityId?: string

    value?: number
    active?: ActiveCharacteristic

    data?: any
}

export interface LightEventArgs extends EventArgs {
    rgb: RGBColor
    hsv: HSVColor
}

export interface StartupEventArgs extends EventArgs {
    hmiVersion: HMIVersion
}
export interface HMIVersion {
    version: number
    model: string
}

export interface HardwareEventArgs extends EventArgs {
    type: 'hw'
}

export interface SensorEventArgs extends EventArgs {
    type: 'sensor'
    temp?: number
    tempUnit?: ['C', 'F']
}
