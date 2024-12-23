import Container, { Service } from "typedi";
import { JwtPayload } from "../models/jwtPayloadModel";
import { DI_KEYS } from "../constants/diKeys";

@Service()
export class CurrentUserService {
	getCurrentUser(): JwtPayload | null {
		return Container.has<JwtPayload>(DI_KEYS.CURRENT_USER)
			? Container.get<JwtPayload>(DI_KEYS.CURRENT_USER)
			: null;
	}
}
