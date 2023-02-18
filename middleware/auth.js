module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', '請先登入才能使用！')//在未登入的情況下進入有使用authenticater的router時，才會跳出訊息
    res.redirect('/users/login')
  }
}
