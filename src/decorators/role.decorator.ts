import { SetMetadata } from "@nestjs/common";
import { Roles } from "src/utils/roles.enum";

export const Role = (...role:Roles[])=>SetMetadata("role",role)