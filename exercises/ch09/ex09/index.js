// SRP違反のコード(1クラスが複数の責任)
class User {
    construction(name, email) {
        this.name = name;
        this.email = email;
    }

    saveToDatabase() {
        // DBへの保存処理
    }

    sendWelcomeEmail() {
        // メール送信処理
    }
}

// SRPを守ったコード
class User2 {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }
}

class UserRepository {
    save(user) {
        // DBへの保存処理
    }
}

class EmailService {
    sendWelcomeEmail(user) {
        // メール送信処理
    }
}