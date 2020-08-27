import { BaseModel } from "@tomuench/vetprovieh-shared/lib/orm/baseModel";

export class Person extends BaseModel {
    id: number | undefined;
    name: string | undefined;
}