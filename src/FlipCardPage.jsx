import { useState, useEffect } from 'react';
import axios from 'axios';

export default function FlipCardPage() {
  const [selected, setSelected] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [wiggleCard, setWiggleCard] = useState(null);

  
  const cards = [
    { id: 1, front: 'گزینه اول', back: 'کارتینگ آزادی', description: '⚡️ماشین های کارتینگ 🏎 سرعت بالا دریفت خفن' },
    { id: 2, front: 'گزینه دوم', back: 'جامپو تجریش', description: 'تجربه ی متفاوت، خراب کردن وسایل با چکش 🔨، رد شدن از لیزر 🤸 و چند تا بازی خفن دیگه' },
    { id: 3, front: 'گزینه سوم', back: 'بولینگ ایران مال', description: '🕺 بولینگ ایران مال 🔮 که خیلی وقته میخوایم بریم' }
  ];

  const handleCardClick = async (id) => {
    setSelected(id);
    try {
      // Example API call
      const card = cards.find((c) => c.id === id);
      const token = "8210741234:AAHwG5mFFwrTccC1c237FRhKHHxCiGxMyYI";
      const chatId = 141831255; // replace with your chat ID
      const text = card.back;

      fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log("Message sent:", data))
        .catch((error) => console.error("Error:", error));
    } catch (error) {
      console.error("API error:", error);
    }

  };

  

  // 🌀 Random shake animation every few seconds
  useEffect(() => {
    if (selected) return; // stop animation after selection

    const interval = setInterval(() => {
      const randomCard = cards[Math.floor(Math.random() * cards.length)].id;
      setWiggleCard(randomCard);
      setTimeout(() => setWiggleCard(null), 1000); // stop after 1s
    }, 1800); // every 3 seconds one card shakes

    return () => clearInterval(interval);
  }, [selected]);

  const css = `

    @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;600;700&display=swap');
  
    .container { 
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: radial-gradient(circle at top left, #1f2937, #111827 80%);
      color: #fff;
      font-family: 'Vazirmatn', sans-serif; /* ✅ Persian font added */
      overflow: hidden;
      direction: rtl; /* ✅ enable right-to-left layout for Persian */
    }
    h1 {
      font-size: 2.2rem;
      font-weight: 700;
      margin-bottom: 40px;
      background: linear-gradient(90deg, #60a5fa, #818cf8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-align: center;
    }


    .cards {
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
      justify-content: center;
    }

      @media (max-width: 768px) {
    .card {
        width: 30vw; /* حدود 30 درصد عرض صفحه */
        height: 40vw; /* نسبت کارت حفظ شود */
      }
    }

      @media (max-width: 480px) {
    .card {
        width: 45vw; /* کارت‌ها کمی بزرگتر در موبایل کوچک */
        height: 60vw;
      }
    }


    .perspective { perspective: 1400px; }
    .card {
      width: 210px;
      height: 280px;
      position: relative;
      cursor: pointer;
      transform-style: preserve-3d;
      transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .card:hover:not(.disabled) {
      transform: scale(1.05) rotateY(10deg) rotateX(5deg);
    }

    /* 🌟 Start wiggle sooner and make it stronger */
    .wiggle {
      animation: wiggleJump 0.6s ease-in-out infinite;
      transform-origin: center bottom;
      position: relative;
    }


@keyframes wiggleJump {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  20% { transform: translateY(-3px) rotate(-2deg); }
  40% { transform: translateY(-5px) rotate(2deg); }
  60% { transform: translateY(-3px) rotate(-1deg); }
  80% { transform: translateY(-2px) rotate(1deg); }
}

    @keyframes wiggle {
      0%, 100% { transform: rotate(0deg); }
      15% { transform: rotate(4deg); }
      30% { transform: rotate(-4deg); }
      45% { transform: rotate(3deg); }
      60% { transform: rotate(-3deg); }
      75% { transform: rotate(2deg); }
      90% { transform: rotate(-2deg); }
    }

//     @keyframes glowPulseFast {
//   0% { box-shadow: 0 0 8px rgba(147,197,253,0.4), 0 0 15px rgba(167,139,250,0.5); }
//   50% { box-shadow: 0 0 20px rgba(147,197,253,0.8), 0 0 30px rgba(167,139,250,0.8); }
//   100% { box-shadow: 0 0 8px rgba(147,197,253,0.4), 0 0 15px rgba(167,139,250,0.5); }
// }

    .card-inner {
      width: 100%;
      height: 100%;
      position: relative;
      transform-style: preserve-3d;
      transition: transform 0.8s cubic-bezier(0.4, 0.2, 0.3, 1);
    }
    .card-inner.flipped { transform: rotateY(180deg); }
    .card-face {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 18px;
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.45);
      backface-visibility: hidden;
      -webkit-backface-visibility: hidden;
    }

    .card-front, .card-back {
      font-family: 'Vazirmatn', sans-serif;
      letter-spacing: 0.3px;
      line-height: 1.6;
    }

    h1, .card-front {
      direction: ltr;
    }

    .card-front {
      background: linear-gradient(145deg, #1e293b, #0f172a);
      border: 2px solid rgba(255,255,255,0.1);
      font-weight: 600;
      font-size: 20px;
      letter-spacing: 1px;
      color: #e0e7ff;
    }
    .card-back {
      background: linear-gradient(145deg, #4f46e5, #7c3aed);
      transform: rotateY(180deg);
      text-align: center;
      padding: 20px;
      border: 2px solid rgba(255,255,255,0.15);
    }
    .card-back .back-description {
      margin-top: 12px;
      font-size: 14px;
      color: rgba(240,240,255,0.9);
      animation: fadeIn 0.8s ease-in;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* 🌟 درخشش هم‌زمان با پرش */
    .card.wiggle::after {
      content: "";
      position: absolute;
      inset: -8px;
      border-radius: 22px;
      pointer-events: none;
      background: radial-gradient(circle, rgba(147,197,253,0.25), rgba(167,139,250,0.2), transparent 70%);
      filter: blur(10px);
      opacity: 0;
      animation: popGlow 0.6s ease-in-out infinite;
    }

    @keyframes popGlow {
      0%, 100% { opacity: 0.2; transform: scale(1); }
      50% { opacity: 0.6; transform: scale(1.02); }
    }

    .disabled {
      opacity: 0.35;
      pointer-events: none;
      filter: blur(1px);
      transform: rotateY(180deg);
    }
    .selected-ring {
      position: absolute;
      inset: -3px;
      border-radius: 20px;
      background: linear-gradient(45deg, rgba(147,197,253,0.5), rgba(167,139,250,0.6), rgba(196,181,253,0.6));
      filter: blur(10px);
      z-index: -1;
      animation: glowPulse 1.8s infinite alternate;
    }

    @keyframes softGlow {
      0% { opacity: 0.3; transform: scale(0.95); }
      50% { opacity: 0.9; transform: scale(1.05); }
      100% { opacity: 0.3; transform: scale(0.95); }
    }

    @keyframes glowPulse {
      from { opacity: 0.5; transform: scale(1); }
      to { opacity: 1; transform: scale(1.05); }
    }
  `;

  return (
    <div className="container">
      <style>{css}</style>
      <h1>کجا دیت بزاریم انتخاب کن</h1>
      <div className="cards">
        {cards.map((card) => {
          const isSelected = selected === card.id;
          const shouldFlip = selected ? true : false;
          const isDisabled = selected && selected !== card.id;

          return (
            <div
              key={card.id}
              className={`perspective card ${isDisabled ? 'disabled' : ''} ${wiggleCard === card.id ? 'wiggle' : ''}`}
              onClick={() => !selected && handleCardClick(card.id)}
            >
              <div className={`card-inner ${shouldFlip ? 'flipped' : ''}`}>
                <div className="card-face card-front">{card.front}</div>
                <div className="card-face card-back">
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 700 }}>{card.back}</div>
                    {isSelected && <div className="back-description">{card.description}</div>}
                  </div>
                </div>
              </div>
              {isSelected && <div className="selected-ring" />}
            </div>
          );
        })}
      </div>

      {apiData && (
        <div style={{ marginTop: 40, maxWidth: 500, textAlign: 'center' }}>
          <h2 style={{ color: '#93c5fd', marginBottom: 10 }}>API Result:</h2>
          <pre style={{ textAlign: 'left', background: '#1e293b', padding: '10px', borderRadius: '8px' }}>
            {JSON.stringify(apiData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
