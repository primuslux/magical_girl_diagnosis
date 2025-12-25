     // MBTI完全対応の診断システム
    // E/I, S/N, T/F, J/P の4軸で判定
    
    const questions = [
      // E/I 判定（外向/内向）
      {
        axis: 'EI',
        q: "新しい魔法の力を手に入れた。まずどうする？",
        choices: [
          { text: "A: みんなに見せて一緒に試したい！", params: { E: 3 } },
          { text: "B: 一人でじっくり練習して理解したい", params: { I: 3 } }
        ]
      },
      {
        axis: 'EI',
        q: "戦いの後、どう過ごす？",
        choices: [
          { text: "A: 仲間と集まって戦果を分かち合う", params: { E: 2 } },
          { text: "B: 一人で静かに休む", params: { I: 2 } }
        ]
      },
      {
        axis: 'EI',
        q: "新しい仲間が加わった",
        choices: [
          { text: "A: すぐに話しかけて仲良くなる", params: { E: 3 } },
          { text: "B: まずは様子を見守る", params: { I: 3 } }
        ]
      },
      
      // S/N 判定（現実/直感）
      {
        axis: 'SN',
        q: "魔法の訓練をするとき",
        choices: [
          { text: "A: 基本から順番に、確実に習得", params: { S: 3 } },
          { text: "B: 直感で色々試して可能性を探る", params: { N: 3 } }
        ]
      },
      {
        axis: 'SN',
        q: "敵の情報を集めるとき",
        choices: [
          { text: "A: 具体的なデータや実績を重視", params: { S: 2 } },
          { text: "B: パターンや将来の可能性を考える", params: { N: 2 } }
        ]
      },
      {
        axis: 'SN',
        q: "戦略を立てるとき",
        choices: [
          { text: "A: 今ある情報で確実な作戦を", params: { S: 3 } },
          { text: "B: 大胆な発想で新しい可能性を", params: { N: 3 } }
        ]
      },
      
      // T/F 判定（思考/感情）
      {
        axis: 'TF',
        q: "仲間と意見が対立したとき",
        choices: [
          { text: "A: 論理的に正しい方を選ぶ", params: { T: 3 } },
          { text: "B: みんなの気持ちを大切にする", params: { F: 3 } }
        ]
      },
      {
        axis: 'TF',
        q: "敵が仲間になりたいと言ってきた",
        choices: [
          { text: "A: 信用できるか冷静に判断", params: { T: 2 } },
          { text: "B: 気持ちを信じて受け入れる", params: { F: 2 } }
        ]
      },
      {
        axis: 'TF',
        q: "大切な判断をするとき",
        choices: [
          { text: "A: 客観的な事実を分析", params: { T: 3 } },
          { text: "B: 心の声に従う", params: { F: 3 } }
        ]
      },
      {
        axis: 'TF',
        q: "魔法少女として一番大切なことは？",
        choices: [
          { text: "A: 効率的に敵を倒す力", params: { T: 2 } },
          { text: "B: 誰かを守りたい想い", params: { F: 2 } },
          { text: "C: 仲間との絆", params: { F: 3 } }
        ]
      },
      
      // J/P 判定（計画/柔軟）
      {
        axis: 'JP',
        q: "戦闘の準備をするとき",
        choices: [
          { text: "A: 事前に計画を立てて準備する", params: { J: 3 } },
          { text: "B: その場の状況に合わせて動く", params: { P: 3 } }
        ]
      },
      {
        axis: 'JP',
        q: "予想外の事態が発生！",
        choices: [
          { text: "A: 一旦落ち着いて計画を立て直す", params: { J: 2 } },
          { text: "B: 臨機応変に対応する", params: { P: 2 } }
        ]
      },
      {
        axis: 'JP',
        q: "日常の過ごし方は？",
        choices: [
          { text: "A: スケジュールを決めて行動", params: { J: 3 } },
          { text: "B: その時の気分で自由に", params: { P: 3 } }
        ]
      },
      
      // 総合判断用
      {
        axis: 'mixed',
        q: "強大な敵と遭遇した！",
        choices: [
          { text: "A: 勇気を出して立ち向かう", params: { E: 1, N: 1, F: 1, P: 1 } },
          { text: "B: 冷静に弱点を分析", params: { I: 1, S: 1, T: 1, J: 1 } },
          { text: "C: 仲間と協力して対処", params: { E: 1, F: 2 } }
        ]
      },
      {
        axis: 'mixed',
        q: "休日の過ごし方は？",
        choices: [
          { text: "A: 友達と外で遊ぶ", params: { E: 2, S: 1, P: 1 } },
          { text: "B: 家で静かに過ごす", params: { I: 2, N: 1, J: 1 } }
        ]
      },
      {
        axis: 'mixed',
        q: "仲間が危機に！",
        choices: [
          { text: "A: すぐに飛び込んで助ける", params: { E: 1, F: 2, P: 1 } },
          { text: "B: 最善の救助方法を考える", params: { I: 1, T: 2, J: 1 } }
        ]
      }
    ];

    // 16タイプの定義（あなたの設定）
    const mbtiTypes = {
      'INFJ': { 
        subtitle: '共感と祈り',
        name: '希望の祈り子',
        roles: ['防御', '支援'],
        desc: '他人の苦しみを深く感じ、救いたいという願いが力となる。静けさの中に揺るぎない意志を秘め、他者の痛みに寄り添う魔法少女。祈りの力で世界の歪みに抗う。'
      },
      'ENTP': { 
        subtitle: '革新と挑戦',
        name: '反逆の火種',
        roles: ['妨害', '独立'],
        desc: '停滞を嫌い、常に新しい風穴を開ける異端の革命児。理から逸脱しながらも、希望の火種を蒔き続ける革命的魔法少女。常識を破る発想力で未来を変える。'
      },
      'ISFP': { 
        subtitle: '感性と静寂',
        name: '花咲く内なる庭',
        roles: ['回復', '攻撃'],
        desc: '誰にも見せない感情の世界を、大切に咲かせている魔法少女。美しさと儚さを愛し、世界の一瞬一瞬に魔力を注ぐ。心のままに咲く、その姿は優雅で鋭い。'
      },
      'ESTJ': { 
        subtitle: '指導と責任',
        name: '規律の盾',
        roles: ['攻撃', '防御'],
        desc: '物事をきちんと整理し、混乱を許さず世界を律する力。任務を遂行する力と責任を背負い、揺るがぬ判断で皆を導く。冷静と情熱が交差する魔法少女。'
      },
      'INFP': { 
        subtitle: '理想と優しさ',
        name: '純心の灯火',
        roles: ['支援', '回復'],
        desc: '理不尽な世界でも、心の中の「こうありたい」姿を信じる。壊れやすい優しさの奥に、誰にも消せない強い光を宿す。迷いながらも、想いを抱いて進む魔法少女。'
      },
      'ENFJ': { 
        subtitle: '思いやりと導き',
        name: '心結びの勇者',
        roles: ['攻撃', '支援'],
        desc: '仲間の願いや痛みに敏感で、皆を引き上げようとする慈愛の魔力。仲間の心を繋ぎ、希望の道を照らすカリスマ魔法少女。優しさと責任感で、闇をも導く。'
      },
      'ISTP': { 
        subtitle: '沈黙と判断',
        name: '機心の造形者',
        roles: ['攻撃', '妨害'],
        desc: '彼女の力は、己の身体ではなく、造られたものを通して発揮される。魔力で動く重装ゴーレム、戦場に展開される魔法兵装。それは無感情に見える鉄の意志。'
      },
      'ESFP': { 
        subtitle: '生きる歓び',
        name: '鮮烈なる舞姫',
        roles: ['防御', '支援'],
        desc: '「今この瞬間を生きる」ことが誰よりも得意な魔法少女。喜びと生命の爆発をそのまま魔力に変える、祝祭の申し子。その存在は戦場すら明るく照らす。'
      },
      'INTJ': { 
        subtitle: '信念と戦略',
        name: '静謐なる星読み',
        roles: ['攻撃', '独立'],
        desc: '誰にも理解されなくても、自分の信じた理想へ真っ直ぐに向かう。世界の理を俯瞰し、計画の先に理想を追う孤高の魔法少女。心の奥に秘めた信念は誰よりも強い。'
      },
      'ENTJ': { 
        subtitle: '責任と決断',
        name: '王冠を戴く者',
        roles: ['攻撃', '防御'],
        desc: '感情を制し、理と力で世界を支配する側に立つ宿命。揺るぎなき指揮と戦略眼で世界のバランスを保つ。冷徹に見えて、その奥には強い守護の意志がある。'
      },
      'INTP': { 
        subtitle: '好奇心と分析',
        name: '真理の探究者',
        roles: ['攻撃', '妨害'],
        desc: '感情より論理に共鳴し、世界の裏側を知ることに心を燃やす。答えを求め、誰も踏み込まぬ世界へ魔力を延ばす知性の魔法少女。理論の果てに希望を見い出す。'
      },
      'ESTP': { 
        subtitle: '闘争と快感',
        name: '本能の跳弾',
        roles: ['攻撃', '支援'],
        desc: '恐れず、止まらず、本能に従い突破する激しい魂。危険を恐れず、刹那の判断で戦場を駆け抜ける。勝利に酔い、敗北すら楽しむ本能型魔法少女。'
      },
      'ESFJ': { 
        subtitle: '包容と安心',
        name: '優しき灯台守',
        roles: ['支援', '回復'],
        desc: '自分を後回しにしてでも、誰かの心を支えようとする優しさ。他者の痛みを自分のものとし、支え合いの魔法で仲間を癒やす。温かな優しさが世界に広がる。'
      },
      'ISTJ': { 
        subtitle: '誠実と継続',
        name: '正しき遺志継ぐ者',
        roles: ['防御', '妨害'],
        desc: '約束を守ること、正しいことを貫くことに宿る力。理と規律を重んじ、安定を支える魔法少女。小さな揺らぎさえも許さず、静かに世界を守り続ける。'
      },
      'ISFJ': { 
        subtitle: '優しさと記憶',
        name: '記憶守る癒やし手',
        roles: ['防御', '支援'],
        desc: '誰かが残した小さな幸せを守りたいという願いが力になる。傷ついた者に寄り添い、そっと癒やしを与える魔法少女。過去を忘れず、誰かを守る力となる。。'
      },
      'ENFP': { 
        subtitle: '自由と情熱',
        name: '想像の風渡り',
        roles: ['攻撃', '支援'],
        desc: '感じるまま、笑い泣き叫びながら生きることが魔力の源。自由奔放な心で、新たな世界を切り拓く。無数の感情をまとい、予測不能な未来を形作る魔法少女。'
      }
    };

    let currentQuestion = 0;
    let params = {
      E: 0, I: 0,  // 外向/内向
      S: 0, N: 0,  // 現実/直感
      T: 0, F: 0,  // 思考/感情
      J: 0, P: 0   // 計画/柔軟
    };

    function init() {
      showQuestion();
    }

    function showQuestion() {
      const q = questions[currentQuestion];
      document.getElementById('progress').textContent = `質問 ${currentQuestion + 1} / ${questions.length}`;
      document.getElementById('question').textContent = q.q;
      
      const choicesDiv = document.getElementById('choices');
      choicesDiv.innerHTML = '';
      
      q.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = choice.text;
        btn.onclick = () => answer(choice.params);
        choicesDiv.appendChild(btn);
      });
    }

    function answer(choiceParams) {
      for (let key in choiceParams) {
        params[key] += choiceParams[key];
      }
      
      currentQuestion++;
      
      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        showResult();
      }
    }

    function calculateMBTI() {
      const type = 
        (params.E >= params.I ? 'E' : 'I') +
        (params.S >= params.N ? 'S' : 'N') +
        (params.T >= params.F ? 'T' : 'F') +
        (params.J >= params.P ? 'J' : 'P');
      return type;
    }

    function showResult() {
      const mbti = calculateMBTI();
      const typeData = mbtiTypes[mbti];
      
      document.getElementById('questionArea').style.display = 'none';
      document.getElementById('progress').style.display = 'none';
      document.getElementById('resultArea').classList.add('show');
      
      document.getElementById('resultCode').textContent = `【 ${mbti} 】`;
      document.getElementById('resultType').textContent = typeData.name;
      document.getElementById('resultSubtitle').textContent = typeData.subtitle;
      document.getElementById('resultDesc').textContent = typeData.desc;
      
      // ロール表示
      const roleItems = document.getElementById('roleItems');
      roleItems.innerHTML = '';
      typeData.roles.forEach(role => {
        const badge = document.createElement('span');
        badge.className = 'role-badge';
        badge.textContent = role;
        roleItems.appendChild(badge);
      });
      
      // パラメータ表示
      const paramsDiv = document.getElementById('resultParams');
      paramsDiv.innerHTML = '<h3 style="margin-bottom: 15px; color: #764ba2;">あなたの性格傾向（MBTI）</h3>';
      
      const axes = [
        { left: 'E', leftName: '外向', right: 'I', rightName: '内向' },
        { left: 'S', leftName: '現実', right: 'N', rightName: '直感' },
        { left: 'T', leftName: '思考', right: 'F', rightName: '感情' },
        { left: 'J', leftName: '計画', right: 'P', rightName: '柔軟' }
      ];
      
      axes.forEach(axis => {
        const leftVal = params[axis.left];
        const rightVal = params[axis.right];
        const total = leftVal + rightVal;
        const leftPct = total > 0 ? (leftVal / total * 100) : 50;
        const isLeft = leftVal >= rightVal;
        
        const row = document.createElement('div');
        row.className = 'param-row';
        row.innerHTML = `
          <div style="width: 100%;">
            <div class="param-labels">
              <span class="param-label ${isLeft ? 'active' : ''}">${axis.leftName} (${axis.left})</span>
              <span class="param-label ${!isLeft ? 'active' : ''}">${axis.rightName} (${axis.right})</span>
            </div>
            <div class="param-bar-container">
              <div class="param-bar" style="width: ${leftPct}%"></div>
            </div>
          </div>
        `;
        paramsDiv.appendChild(row);
      });
      
      // 画像設定
      const typeIndex = Object.keys(mbtiTypes).indexOf(mbti);
      const typeId = String(typeIndex + 1).padStart(2, '0');
      document.getElementById('resultImage').src = `./img/type${typeId}.png`;
      
      document.getElementById('resultImage').onerror = function() {
        this.style.display = 'none';
      };
    }

    function restart() {
      currentQuestion = 0;
      params = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
      document.getElementById('questionArea').style.display = 'block';
      document.getElementById('progress').style.display = 'block';
      document.getElementById('resultArea').classList.remove('show');
      init();
    }

    init();
