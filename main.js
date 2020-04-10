'use strict'


const selectYear = document.getElementById('year');
const selectMonth = document.getElementById('month');
const selectDate = document.getElementById('date');
const d = new Date();
const thisYear = d.getFullYear();
const thisMonth = d.getMonth() + 1;
const thisDate = d.getDate();

function defaultY() {
  const defaultYear = document.createElement('option');
  defaultYear.textContent = '選択してください';
  defaultYear.value = 'nonSelectedY'
  selectYear.appendChild(defaultYear);
  let i = 0
  while (i <= thisYear - 1900) {
    const optionYear = document.createElement('option');
    optionYear.textContent = `${thisYear - i}`;
    optionYear.value = `${thisYear - i}`
    document.getElementById('year').appendChild(optionYear);
    i++
  }
  document.getElementById('calcule').disabled = true;
}

function IsLeapYear(n) {
  return n % 4 === 0 && n !== 1900;
}

function numberOfMonth(y) {
  if (y === thisYear) {
    return thisMonth;
  } else {
    return 12;
  }
};

function numberOfDate(y, m) {
  if (y === thisYear && m === thisMonth) {
    return thisDate;
  } else if (m === 1 || m === 3 || m === 5 || m === 7 || m === 8 || m === 10 || m ===12) {
    return 31;
  } else if (m === 4 || m === 6 || m === 9 || m === 11) {
    return 30;
  } else if (IsLeapYear(y)) {
    return 29;
  } else {
    return 28;
  }
};



function yearSelected() {
  selectMonth.textContent = ''
  selectDate.textContent = ''
  if (selectYear.value !== 'nonSelectedY') {
    let i = 1;
    const optionMonth = document.createElement(`option`);
    optionMonth.textContent = '選択してください';
    optionMonth.value = 'nonSelectedM'
    document.getElementById('month').appendChild(optionMonth);
    while (i <= numberOfMonth(Number(selectYear.value))) {
      const optionMonth = document.createElement(`option`);
      optionMonth.textContent = `${i}`;
      optionMonth.value = `${i}`;
      document.getElementById('month').appendChild(optionMonth);
      i++;
    }
  } else {
    alert('生年を選択してください。');
    selectMonth.textContent = ''
    selectDate.textContent = ''
  }
  document.getElementById('calcule').disabled = true;
};

function monthSelected() {
  selectDate.textContent = ''
  if (selectMonth.value !== 'nonSelectedM') {
    let i = 1;
    const y = Number(selectYear.value);
    const m = Number(selectMonth.value);
    const optionDate = document.createElement(`option`);
    optionDate.textContent = '選択してください'
    optionDate.value = 'nonSelectedD'
    document.getElementById('date').appendChild(optionDate);
    while (i <= numberOfDate(y, m)) {
      const optionDate = document.createElement(`option`);
      optionDate.textContent = `${i}`;
      optionDate.value = `${i}`;
      document.getElementById('date').appendChild(optionDate);
      i++
    }
  } else {
    alert('月を選択してください。');
    selectDate.textContent = ''
  }
  document.getElementById('calcule').disabled = true;
};

function dateSelected() {
  if (selectDate.value !== 'nonSelectedD') {
    document.getElementById('calcule').disabled = false;
  } else {
    document.getElementById('calcule').disabled = true;
    alert('日付を選択してください。');
  }
};

function howOldAreYou(y, m, d) {
  const differenceYear = thisYear - y;
  if (m < thisMonth) {
    return differenceYear;
  } else if (m > thisMonth) {
    return differenceYear - 1;
  } else if (d <= thisDate) {
    return differenceYear;
  } else {
  return differenceYear - 1;
  }
};

document.querySelector('form').addEventListener('submit', e => {
  e.preventDefault();
  document.querySelector('main').textContent = '';
  const y = Number(selectYear.value);
  const m = Number(selectMonth.value);
  const d = Number(selectDate.value);
  const yourOld = document.createElement('section');
  yourOld.textContent = `あなたの年齢は${howOldAreYou(y,m,d)}歳です`;
  document.querySelector('main').appendChild(yourOld);
});

document.getElementById('reset').addEventListener('click', () => {
  selectYear.textContent = '';
  selectMonth.textContent = '';
  selectDate.textContent = '';
  document.querySelector('main').textContent = '';
  defaultY();
});

defaultY();
