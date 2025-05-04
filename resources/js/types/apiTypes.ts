import { Component, Hull, Oddity, Ship, Weapon } from "./shipTypes";

export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

export interface LoginResponse {
    success: boolean;
    user: { name: string };
}

export type ShipResponse = ApiResponse<Ship>;
export type ShipsResponse = ApiResponse<Ship[]>;
export type HullsResponse = ApiResponse<Hull[]>;
export type ComponentsResponse = ApiResponse<Component[]>;
export type WeaponsResponse = ApiResponse<Weapon[]>;
export type OdditiesResponse = ApiResponse<Oddity[]>;
