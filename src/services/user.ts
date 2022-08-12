import { IUser } from "./IUser";
import UserCollection from "../../user-collection.json";
import { parseEarnings } from "./utils";

class UserService {
  public static async getUser(id: number) {
    const filteredUsers = UserCollection.filter((User) => User.id === id);
    return filteredUsers;
  }

  public static async addUser(user: IUser): Promise<string> {
    const users = new Map<string, IUser>();

    UserCollection.map((user) => {
      users.set(user.name, user);
    });

    if (users.get(user.name)) return "this user Already Exists";

    users.set(user.name, user);
    return "ok";
  }

  public static distinctCountries(): string[] {
    const countries = new Set<string>();
    UserCollection.map((user) => {
      countries.add(user.country);
    });
    return Array.from(countries).sort();
  }

  public static statistics(): any {
    const countryUsers: Record<string, IUser[]> = {};
    UserCollection.sort((user1, user2) => parseEarnings(user2.earnings) - parseEarnings(user1.earnings)).map((user) => {
      let m = (countryUsers[user.country] = countryUsers[user.country] || []);
      if (m.length < 10) {
        m.push(user);
      }
    });
    return countryUsers;
  }

  public static statisticsTopEmployer(): any {
    const countryUsers: IUser[] = [];
    let last: string = null;
    UserCollection.sort((a, b) => {
      if (a.country < b.country) {
        return -1;
      }
      if (a.country > b.country) {
        return 1;
      }
      return parseEarnings(b.earnings) - parseEarnings(a.earnings);
    }).map((user) => {
      if (user.country != last) countryUsers.push(user);
      last = user.country;
    });

    return countryUsers.sort((a, b) => parseEarnings(b.earnings) - parseEarnings(a.earnings)).slice(0, 10);
  }
}

export default UserService;
