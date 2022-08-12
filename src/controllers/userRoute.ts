import Base from "./base";
import UserService from "../services/user";
import { validator } from "../services/utils";
import { userSchema } from "../services/userSchema.validation";

class UserController extends Base {
  constructor() {
    super();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/users", this.getUser);
    this.router.post("/user", validator.body(userSchema), this.addUser);
    this.router.route("/users/countries").get(this.distinctCountries);
    this.router.route("/users/statistics").get(this.statistics);
    this.router.route("/users/topsalaries").get(this.topSalariesInCountry);
    return this.router;
  }

  getUser(req: any, res: any) {
    res.send(UserService.getUser(Number.parseInt(req.query.id as string)));
  }
  addUser(req: any, res: any) {
    console.log(req.body);
    res.send(UserService.addUser(req.body));
  }
  distinctCountries(req: any, res: any) {
    res.send(UserService.distinctCountries());
  }
  statistics(req: any, res: any) {
    res.send(UserService.statistics());
  }
  topSalariesInCountry(req: any, res: any) {
    res.send(UserService.statisticsTopEmployer());
  }
}
export default new UserController();
