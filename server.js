const express=require('express');
const app=express();
const session = require('express-session')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'mySecret',
  saveUninitialized: true,
  resave: true
}));

app.set('view engine','ejs');
app.set('views','views');

const isLogin = (req, res, next) => {
  if (req.session.username) next();
  else res.redirect('/login');
};
////////////////////页面跳转//////////////////////////////////////////
app.get(['/','login'],function(req,res){
    console.log("login Page")
    res.render('login')
})

app.get('/register',function(req,res){
    console.log("register Page")
    res.render('register')
})

app.get('/create',isLogin,function(req,res){
    console.log("create Page")
    res.render('create')
})

app.get('/search',isLogin,function(req,res){
    console.log("search Page")
    res.render('search',{
        accounts:getAllAccounts()
    })
})

app.get('/edit/:username',isLogin,function(req,res){
    const username = req.params.username;
    const account = getAccountByUsername(username);
    console.log("edit Page")
    res.render('edit', { account });
})

app.get('/dashboard',isLogin,function(req,res){
    console.log("dashboard Page")
    if(req.session.username==null){
        res.render('login')
    }else{
            res.render('dashboard',{
            username:req.session.username,
            accounts:getAllAccounts()
        })
    }

})

////////////////////////////////////////////////////////////////////////
function getAllAccounts(){
    return accounts = [                  //取所有accounts,现有的只是test data，请改
    { username: 1, password: 11, email: '1@gmail.com' },
    { username: 2, password: 22, email: '2@gmail.com' },
    { username: 3, password: 33, email: '3@gmail.com' }
  ];    
}

function getAccountByUsername(username){
  return account = { username: 1, password: 11, email: '1@gmail.com' };// 用username取account,现有的只是test data，请改
}

function deleteAccountByUsername(username){
  //用username搵返條data然後del.
}

app.post('/login',async (req, res) => {        
  const username = req.body.username;
  const password = req.body.password;
  console.log("dashboard Page")
    if(true){            //判定密码对不对，改走个true.
        req.session.username = username;
        res.render('dashboard',{
            username:req.session.username,
            accounts:getAllAccounts()
        })
    }else{
        res.send('Invalid');
    }
});

app.post('/register', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  try {
    //加create account

    console.log(username,password,email);
    res.redirect('/login');
  } catch {
    res.send('Username exists');
  }
});

app.post('/register', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  try {
    //加create account,同上面一样。

    console.log(username,password,email);
    res.redirect('/login');
  } catch {
    res.send('Username exists');
  }
});

app.post('/search', isLogin,async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  try {
      const accounts = [                  ////用username，email  搜寻record,现有的只是test data，请改
    { username: 1, password: 1, email: '1@gmail.com' },
    { username: 2, password: 2, email: '2@gmail.com' },
    { username: 3, password: 3, email: '3@gmail.com' }
  ];    
    res.render('search',{
        accounts:accounts
    })
  } catch {
    res.send('no data finded');
  }
});

app.post('/edit/:username',isLogin, async (req, res) => {
  const username = req.params.username;
  const password = req.params.password;
  const email = req.params.email;
  //能被edit的column只有password 同email 。 用username嚟搵。username係primary key.

  res.redirect('/dashboard');
  console.log('edit ',username);
});

app.post('/delete/:username', isLogin,async (req, res) => {
  const username = req.params.username;
  deleteAccountByUsername(username);
  res.redirect('/dashboard');
  console.log('delete account ',username);
});
////////////////////restful api//////////////////////////////
app.get('/api/accounts', async (req, res) => {
  const accounts = getAllAccounts();
  res.json(accounts);
});

app.post('/api/accounts', async (req, res) => {
  const account = getAllAccounts();
  res.status(201).json(account);
});

app.put('/api/accounts/:username/:password/:email', async (req, res) => {
  const username = req.params.username;
  const password = req.params.password;
  const email = req.params.email;
  //同上面edit一样
  //再select一次個account ,  const account = .....
  res.json(account);
});

app.delete('/api/accounts/:username', async (req, res) => {
  deleteAccountByUsername(username);
  res.status(204).send();
});



///////////////////////////////////////////////////////////////////////////
app.listen(8099,function(){
    console.log('服务已启动')
})
