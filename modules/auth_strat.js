var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcrypt");

var generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

var validPassword = (plainPassword, hash) => {
  return bcrypt.compareSync(plainPassword, hash);
};

module.exports = (passport) => {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (username, done) => {
    try {
      user = await db.getUser(username);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  passport.use("local-signup", new LocalStrategy({passReqToCallback: true}, async (req, username, password, done) => {
    try {
      password = generateHash(password);

      res = await db.addUser({
        id: username,
        password: password,
        name: req.body.name
      });
      user = await db.getUser(username);
      if (res.success) return done(null, user);
      else return done(null, false);

    } catch (error) {
      done(error);
    }
  }));

  passport.use("local-login", new LocalStrategy({passReqToCallback: true}, async (req, username, password, done) => {
    try {
      user = await db.getUser(username, true);
      if (!user) return done(null, null);
      var hashedPassword = user.password;
      delete user.password;
      return done(null, (validPassword(password, hashedPassword) ? user : null));
    } catch (error) {
      return done(error);
    }
  }));
};
