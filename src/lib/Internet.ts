export default class Internet {
  static async post(path: string, body?: Record<string, unknown>) {
    const resp = await fetch(path, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    return resp.json();
  }

  static async delete(path: string, params?: Record<string, unknown>) {
    const resp = await fetch(path, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify(params),
    });
    return resp.json();
  }

  static async setToken({ uid, token }: { uid: string; token: string }) {
    return Internet.post("/token", { uid, token });
  }

  static async deleteToken(): Promise<void> {
    return Internet.delete("/token");
  }
}
