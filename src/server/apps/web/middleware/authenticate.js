import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

let opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: "noel",
  passReqToCallback: true
}

passport.use(new Strategy(opts, (req, payload, done) => {
  req.loggedUser = payload;
  done(null, payload);
}));

// custom callback - http://www.passportjs.org/docs/authenticate/ 
export default function(req, res, next) {
  passport.authenticate('jwt', { session: false }, function(err, user, info) {

    // user = false: unauthenticated
    if (!user) {
      return res.status(401).send("Unauthenticated");
    }

    req.user = user;
    
    next();
  })(req, res, next);
};