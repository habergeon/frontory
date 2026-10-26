// contain과 오프스크린 콘텐츠: 실제 HTML/CSS 실험
export function mount({ container, locale = 'ko' }) {
  const messages =
    locale === 'en'
      ? {
          title: 'contain and Offscreen Content',
          note: 'Change content-visibility to visible and record initial rendering and scrolling. Also check whether search and Tab reach the cards near the end. Inside Shadow DOM, body/html/:root selectors become .doc. @media responds to the outer preview viewport. The width slider changes only the container width. Network access, form navigation, and iframes are restricted.',
          display003: 'Element to run in an external environment: ',
          display004: 'Inspect current DOM / styles',
          display005: 'HTML source',
          display006: 'CSS source',
          display007: 'Container width',
          display008: 'Card ',
          display009: 'Apply',
        }
      : {
          title: 'contain과 오프스크린 콘텐츠',
          note: 'content-visibility를 visible로 바꾸고 초기 렌더 및 스크롤을 기록하세요. 검색과 Tab으로 뒤쪽 카드에 도달하는지도 확인합니다. Shadow DOM에서 body/html/:root를 .doc로 옮깁니다. @media는 바깥 미리보기 viewport에 반응합니다. 폭 슬라이더는 컨테이너 폭만 변경합니다. 네트워크·폼 이동·iframe은 제한됩니다.',
          display003: '외부 환경에서 실행할 요소: ',
          display004: '현재 DOM / 스타일 검사',
          display005: 'HTML 소스',
          display006: 'CSS 소스',
          display007: '컨테이너 폭',
          display008: '카드 ',
          display009: '적용',
        }
  const HTML =
      '<main>' +
      '<article><a href="#card-0" id="card-0">' +
      messages.display008 +
      '0</a><p>높이가 다른 내용 </p></article>' +
      '<article><a href="#card-1" id="card-1">' +
      messages.display008 +
      '1</a><p>높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-2" id="card-2">' +
      messages.display008 +
      '2</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-3" id="card-3">' +
      messages.display008 +
      '3</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-4" id="card-4">' +
      messages.display008 +
      '4</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-5" id="card-5">' +
      messages.display008 +
      '5</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-6" id="card-6">' +
      messages.display008 +
      '6</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-7" id="card-7">' +
      messages.display008 +
      '7</a><p>높이가 다른 내용 </p></article>' +
      '<article><a href="#card-8" id="card-8">' +
      messages.display008 +
      '8</a><p>높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-9" id="card-9">' +
      messages.display008 +
      '9</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-10" id="card-10">' +
      messages.display008 +
      '10</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-11" id="card-11">' +
      messages.display008 +
      '11</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-12" id="card-12">' +
      messages.display008 +
      '12</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-13" id="card-13">' +
      messages.display008 +
      '13</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-14" id="card-14">' +
      messages.display008 +
      '14</a><p>높이가 다른 내용 </p></article>' +
      '<article><a href="#card-15" id="card-15">' +
      messages.display008 +
      '15</a><p>높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-16" id="card-16">' +
      messages.display008 +
      '16</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-17" id="card-17">' +
      messages.display008 +
      '17</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-18" id="card-18">' +
      messages.display008 +
      '18</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-19" id="card-19">' +
      messages.display008 +
      '19</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-20" id="card-20">' +
      messages.display008 +
      '20</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-21" id="card-21">' +
      messages.display008 +
      '21</a><p>높이가 다른 내용 </p></article>' +
      '<article><a href="#card-22" id="card-22">' +
      messages.display008 +
      '22</a><p>높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-23" id="card-23">' +
      messages.display008 +
      '23</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-24" id="card-24">' +
      messages.display008 +
      '24</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-25" id="card-25">' +
      messages.display008 +
      '25</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-26" id="card-26">' +
      messages.display008 +
      '26</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-27" id="card-27">' +
      messages.display008 +
      '27</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-28" id="card-28">' +
      messages.display008 +
      '28</a><p>높이가 다른 내용 </p></article>' +
      '<article><a href="#card-29" id="card-29">' +
      messages.display008 +
      '29</a><p>높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-30" id="card-30">' +
      messages.display008 +
      '30</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-31" id="card-31">' +
      messages.display008 +
      '31</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-32" id="card-32">' +
      messages.display008 +
      '32</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-33" id="card-33">' +
      messages.display008 +
      '33</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-34" id="card-34">' +
      messages.display008 +
      '34</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-35" id="card-35">' +
      messages.display008 +
      '35</a><p>높이가 다른 내용 </p></article>' +
      '<article><a href="#card-36" id="card-36">' +
      messages.display008 +
      '36</a><p>높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-37" id="card-37">' +
      messages.display008 +
      '37</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-38" id="card-38">' +
      messages.display008 +
      '38</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-39" id="card-39">' +
      messages.display008 +
      '39</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-40" id="card-40">' +
      messages.display008 +
      '40</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-41" id="card-41">' +
      messages.display008 +
      '41</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-42" id="card-42">' +
      messages.display008 +
      '42</a><p>높이가 다른 내용 </p></article>' +
      '<article><a href="#card-43" id="card-43">' +
      messages.display008 +
      '43</a><p>높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-44" id="card-44">' +
      messages.display008 +
      '44</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-45" id="card-45">' +
      messages.display008 +
      '45</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-46" id="card-46">' +
      messages.display008 +
      '46</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-47" id="card-47">' +
      messages.display008 +
      '47</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-48" id="card-48">' +
      messages.display008 +
      '48</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-49" id="card-49">' +
      messages.display008 +
      '49</a><p>높이가 다른 내용 </p></article>' +
      '<article><a href="#card-50" id="card-50">' +
      messages.display008 +
      '50</a><p>높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-51" id="card-51">' +
      messages.display008 +
      '51</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-52" id="card-52">' +
      messages.display008 +
      '52</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-53" id="card-53">' +
      messages.display008 +
      '53</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-54" id="card-54">' +
      messages.display008 +
      '54</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-55" id="card-55">' +
      messages.display008 +
      '55</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-56" id="card-56">' +
      messages.display008 +
      '56</a><p>높이가 다른 내용 </p></article>' +
      '<article><a href="#card-57" id="card-57">' +
      messages.display008 +
      '57</a><p>높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-58" id="card-58">' +
      messages.display008 +
      '58</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-59" id="card-59">' +
      messages.display008 +
      '59</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-60" id="card-60">' +
      messages.display008 +
      '60</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-61" id="card-61">' +
      messages.display008 +
      '61</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-62" id="card-62">' +
      messages.display008 +
      '62</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-63" id="card-63">' +
      messages.display008 +
      '63</a><p>높이가 다른 내용 </p></article>' +
      '<article><a href="#card-64" id="card-64">' +
      messages.display008 +
      '64</a><p>높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-65" id="card-65">' +
      messages.display008 +
      '65</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-66" id="card-66">' +
      messages.display008 +
      '66</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-67" id="card-67">' +
      messages.display008 +
      '67</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-68" id="card-68">' +
      messages.display008 +
      '68</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-69" id="card-69">' +
      messages.display008 +
      '69</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-70" id="card-70">' +
      messages.display008 +
      '70</a><p>높이가 다른 내용 </p></article>' +
      '<article><a href="#card-71" id="card-71">' +
      messages.display008 +
      '71</a><p>높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-72" id="card-72">' +
      messages.display008 +
      '72</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-73" id="card-73">' +
      messages.display008 +
      '73</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-74" id="card-74">' +
      messages.display008 +
      '74</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-75" id="card-75">' +
      messages.display008 +
      '75</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-76" id="card-76">' +
      messages.display008 +
      '76</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-77" id="card-77">' +
      messages.display008 +
      '77</a><p>높이가 다른 내용 </p></article>' +
      '<article><a href="#card-78" id="card-78">' +
      messages.display008 +
      '78</a><p>높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-79" id="card-79">' +
      messages.display008 +
      '79</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-80" id="card-80">' +
      messages.display008 +
      '80</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-81" id="card-81">' +
      messages.display008 +
      '81</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-82" id="card-82">' +
      messages.display008 +
      '82</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-83" id="card-83">' +
      messages.display008 +
      '83</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-84" id="card-84">' +
      messages.display008 +
      '84</a><p>높이가 다른 내용 </p></article>' +
      '<article><a href="#card-85" id="card-85">' +
      messages.display008 +
      '85</a><p>높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-86" id="card-86">' +
      messages.display008 +
      '86</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-87" id="card-87">' +
      messages.display008 +
      '87</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-88" id="card-88">' +
      messages.display008 +
      '88</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-89" id="card-89">' +
      messages.display008 +
      '89</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-90" id="card-90">' +
      messages.display008 +
      '90</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-91" id="card-91">' +
      messages.display008 +
      '91</a><p>높이가 다른 내용 </p></article>' +
      '<article><a href="#card-92" id="card-92">' +
      messages.display008 +
      '92</a><p>높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-93" id="card-93">' +
      messages.display008 +
      '93</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-94" id="card-94">' +
      messages.display008 +
      '94</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-95" id="card-95">' +
      messages.display008 +
      '95</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-96" id="card-96">' +
      messages.display008 +
      '96</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-97" id="card-97">' +
      messages.display008 +
      '97</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-98" id="card-98">' +
      messages.display008 +
      '98</a><p>높이가 다른 내용 </p></article>' +
      '<article><a href="#card-99" id="card-99">' +
      messages.display008 +
      '99</a><p>높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-100" id="card-100">' +
      messages.display008 +
      '100</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-101" id="card-101">' +
      messages.display008 +
      '101</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-102" id="card-102">' +
      messages.display008 +
      '102</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-103" id="card-103">' +
      messages.display008 +
      '103</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-104" id="card-104">' +
      messages.display008 +
      '104</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-105" id="card-105">' +
      messages.display008 +
      '105</a><p>높이가 다른 내용 </p></article>' +
      '<article><a href="#card-106" id="card-106">' +
      messages.display008 +
      '106</a><p>높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-107" id="card-107">' +
      messages.display008 +
      '107</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-108" id="card-108">' +
      messages.display008 +
      '108</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-109" id="card-109">' +
      messages.display008 +
      '109</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-110" id="card-110">' +
      messages.display008 +
      '110</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-111" id="card-111">' +
      messages.display008 +
      '111</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-112" id="card-112">' +
      messages.display008 +
      '112</a><p>높이가 다른 내용 </p></article>' +
      '<article><a href="#card-113" id="card-113">' +
      messages.display008 +
      '113</a><p>높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-114" id="card-114">' +
      messages.display008 +
      '114</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-115" id="card-115">' +
      messages.display008 +
      '115</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-116" id="card-116">' +
      messages.display008 +
      '116</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-117" id="card-117">' +
      messages.display008 +
      '117</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-118" id="card-118">' +
      messages.display008 +
      '118</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-119" id="card-119">' +
      messages.display008 +
      '119</a><p>높이가 다른 내용 </p></article>' +
      '<article><a href="#card-120" id="card-120">' +
      messages.display008 +
      '120</a><p>높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-121" id="card-121">' +
      messages.display008 +
      '121</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-122" id="card-122">' +
      messages.display008 +
      '122</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-123" id="card-123">' +
      messages.display008 +
      '123</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-124" id="card-124">' +
      messages.display008 +
      '124</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-125" id="card-125">' +
      messages.display008 +
      '125</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-126" id="card-126">' +
      messages.display008 +
      '126</a><p>높이가 다른 내용 </p></article>' +
      '<article><a href="#card-127" id="card-127">' +
      messages.display008 +
      '127</a><p>높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-128" id="card-128">' +
      messages.display008 +
      '128</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-129" id="card-129">' +
      messages.display008 +
      '129</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-130" id="card-130">' +
      messages.display008 +
      '130</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-131" id="card-131">' +
      messages.display008 +
      '131</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-132" id="card-132">' +
      messages.display008 +
      '132</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-133" id="card-133">' +
      messages.display008 +
      '133</a><p>높이가 다른 내용 </p></article>' +
      '<article><a href="#card-134" id="card-134">' +
      messages.display008 +
      '134</a><p>높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-135" id="card-135">' +
      messages.display008 +
      '135</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-136" id="card-136">' +
      messages.display008 +
      '136</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-137" id="card-137">' +
      messages.display008 +
      '137</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-138" id="card-138">' +
      messages.display008 +
      '138</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-139" id="card-139">' +
      messages.display008 +
      '139</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-140" id="card-140">' +
      messages.display008 +
      '140</a><p>높이가 다른 내용 </p></article>' +
      '<article><a href="#card-141" id="card-141">' +
      messages.display008 +
      '141</a><p>높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-142" id="card-142">' +
      messages.display008 +
      '142</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-143" id="card-143">' +
      messages.display008 +
      '143</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-144" id="card-144">' +
      messages.display008 +
      '144</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-145" id="card-145">' +
      messages.display008 +
      '145</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-146" id="card-146">' +
      messages.display008 +
      '146</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-147" id="card-147">' +
      messages.display008 +
      '147</a><p>높이가 다른 내용 </p></article>' +
      '<article><a href="#card-148" id="card-148">' +
      messages.display008 +
      '148</a><p>높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-149" id="card-149">' +
      messages.display008 +
      '149</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-150" id="card-150">' +
      messages.display008 +
      '150</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-151" id="card-151">' +
      messages.display008 +
      '151</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-152" id="card-152">' +
      messages.display008 +
      '152</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-153" id="card-153">' +
      messages.display008 +
      '153</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-154" id="card-154">' +
      messages.display008 +
      '154</a><p>높이가 다른 내용 </p></article>' +
      '<article><a href="#card-155" id="card-155">' +
      messages.display008 +
      '155</a><p>높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-156" id="card-156">' +
      messages.display008 +
      '156</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-157" id="card-157">' +
      messages.display008 +
      '157</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-158" id="card-158">' +
      messages.display008 +
      '158</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-159" id="card-159">' +
      messages.display008 +
      '159</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-160" id="card-160">' +
      messages.display008 +
      '160</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-161" id="card-161">' +
      messages.display008 +
      '161</a><p>높이가 다른 내용 </p></article>' +
      '<article><a href="#card-162" id="card-162">' +
      messages.display008 +
      '162</a><p>높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-163" id="card-163">' +
      messages.display008 +
      '163</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-164" id="card-164">' +
      messages.display008 +
      '164</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-165" id="card-165">' +
      messages.display008 +
      '165</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-166" id="card-166">' +
      messages.display008 +
      '166</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-167" id="card-167">' +
      messages.display008 +
      '167</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-168" id="card-168">' +
      messages.display008 +
      '168</a><p>높이가 다른 내용 </p></article>' +
      '<article><a href="#card-169" id="card-169">' +
      messages.display008 +
      '169</a><p>높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-170" id="card-170">' +
      messages.display008 +
      '170</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-171" id="card-171">' +
      messages.display008 +
      '171</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-172" id="card-172">' +
      messages.display008 +
      '172</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-173" id="card-173">' +
      messages.display008 +
      '173</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-174" id="card-174">' +
      messages.display008 +
      '174</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-175" id="card-175">' +
      messages.display008 +
      '175</a><p>높이가 다른 내용 </p></article>' +
      '<article><a href="#card-176" id="card-176">' +
      messages.display008 +
      '176</a><p>높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-177" id="card-177">' +
      messages.display008 +
      '177</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-178" id="card-178">' +
      messages.display008 +
      '178</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-179" id="card-179">' +
      messages.display008 +
      '179</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-180" id="card-180">' +
      messages.display008 +
      '180</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-181" id="card-181">' +
      messages.display008 +
      '181</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-182" id="card-182">' +
      messages.display008 +
      '182</a><p>높이가 다른 내용 </p></article>' +
      '<article><a href="#card-183" id="card-183">' +
      messages.display008 +
      '183</a><p>높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-184" id="card-184">' +
      messages.display008 +
      '184</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-185" id="card-185">' +
      messages.display008 +
      '185</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-186" id="card-186">' +
      messages.display008 +
      '186</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-187" id="card-187">' +
      messages.display008 +
      '187</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-188" id="card-188">' +
      messages.display008 +
      '188</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-189" id="card-189">' +
      messages.display008 +
      '189</a><p>높이가 다른 내용 </p></article>' +
      '<article><a href="#card-190" id="card-190">' +
      messages.display008 +
      '190</a><p>높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-191" id="card-191">' +
      messages.display008 +
      '191</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-192" id="card-192">' +
      messages.display008 +
      '192</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-193" id="card-193">' +
      messages.display008 +
      '193</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-194" id="card-194">' +
      messages.display008 +
      '194</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-195" id="card-195">' +
      messages.display008 +
      '195</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-196" id="card-196">' +
      messages.display008 +
      '196</a><p>높이가 다른 내용 </p></article>' +
      '<article><a href="#card-197" id="card-197">' +
      messages.display008 +
      '197</a><p>높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-198" id="card-198">' +
      messages.display008 +
      '198</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '<article><a href="#card-199" id="card-199">' +
      messages.display008 +
      '199</a><p>높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 높이가 다른 내용 </p></article>' +
      '</main>',
    CSS =
      'article{content-visibility:auto;contain-intrinsic-size:auto 120px;margin:16px;padding:20px;border:1px solid #92b9e5}'
  const originalRootSize = document.documentElement.style.fontSize
  const controller = new AbortController(),
    signal = controller.signal
  const heading = document.createElement('h2')
  heading.textContent = messages.title
  const note = document.createElement('p')
  note.textContent = messages.note
  const html = document.createElement('textarea'),
    css = document.createElement('textarea')
  html.value = HTML
  css.value = CSS
  for (const field of [html, css]) {
    field.setAttribute(
      'aria-label',
      field === html ? messages.display005 : messages.display006,
    )
    field.rows = 6
    field.style.cssText = 'display:block;width:100%;font-family:monospace'
  }
  const apply = document.createElement('button')
  apply.textContent = messages.display009
  const inspect = document.createElement('button')
  inspect.textContent = messages.display004
  const width = document.createElement('input')
  width.type = 'range'
  width.min = '280'
  width.max = '1200'
  width.value = '700'
  width.setAttribute('aria-label', messages.display007)
  const host = document.createElement('section')
  host.style.cssText =
    'display:block;background:white;border:1px solid #9ab;max-width:100%;max-height:450px;overflow:auto'
  const shadow = host.attachShadow({ mode: 'open' })
  const output = document.createElement('pre')
  output.style.whiteSpace = 'pre-wrap'
  output.setAttribute('aria-live', 'polite')
  let sourceDocument
  const measure = () => {
    const root = shadow.querySelector('.doc')
    if (!root) return
    const nodes = [
      ...root.querySelectorAll('.card,.child,button,img,input,article,p'),
    ].slice(0, 18)
    output.textContent = JSON.stringify(
      {
        title: sourceDocument.title,
        lang: sourceDocument.documentElement.lang,
        containerWidth: host.clientWidth,
        viewportWidth: innerWidth,
        scrollWidth: root.scrollWidth,
        forms: [...root.querySelectorAll('form')].map((form) => ({
          valid: form.checkValidity(),
          entries: [...new FormData(form)],
        })),
        links: [...root.querySelectorAll('a')]
          .slice(0, 8)
          .map((a) => ({ text: a.textContent, href: a.getAttribute('href') })),
        nodes: nodes.map((node) => {
          const s = getComputedStyle(node)
          return {
            tag: node.tagName,
            width: Math.round(node.getBoundingClientRect().width),
            color: s.color,
            background: s.backgroundColor,
            display: s.display,
            boxSizing: s.boxSizing,
            grid: s.gridTemplateColumns,
            transform: s.transform,
            currentSrc:
              node instanceof HTMLImageElement ? node.currentSrc : undefined,
          }
        }),
        repairedBody: root.innerHTML.slice(0, 1800),
      },
      null,
      2,
    )
  }
  const render = () => {
    if (false) {
      const font = css.value.match(/font-size:[ ]*([0-9.]+px)/)
      if (font) document.documentElement.style.fontSize = font[1]
    }
    sourceDocument = new DOMParser().parseFromString(html.value, 'text/html')
    const style = document.createElement('style')
    style.textContent =
      '.doc{font-family:system-ui;color:#172c43;padding:16px}' +
      css.value.replace(/:root|\bbody\b|\bhtml\b/g, '.doc')
    const root = document.createElement('div')
    root.className = 'doc'
    root.lang = sourceDocument.documentElement.lang
    root.innerHTML = sourceDocument.body.innerHTML
    root.querySelectorAll('script,iframe').forEach((node) => {
      const text = document.createElement('pre')
      text.textContent = messages.display003 + node.outerHTML
      node.replaceWith(text)
    })
    shadow.replaceChildren(style, root)
    host.style.width = width.value + 'px'
    root.querySelectorAll('form').forEach((form) =>
      form.addEventListener(
        'submit',
        (event) => {
          event.preventDefault()
          const dialog = form.closest('dialog')
          if (form.getAttribute('method') === 'dialog') dialog?.close()
          measure()
        },
        { signal },
      ),
    )
    root.querySelectorAll('a[href^="#"]').forEach((a) =>
      a.addEventListener(
        'click',
        (event) => {
          event.preventDefault()
          const id = a.getAttribute('href').slice(1)
          const target = [...root.querySelectorAll('[id]')].find(
            (node) => node.id === id,
          )
          target?.scrollIntoView()
          if (target instanceof HTMLElement) target.focus()
        },
        { signal },
      ),
    )
    const opener = root.querySelector('[data-open-dialog]'),
      dialog = root.querySelector('dialog')
    opener?.addEventListener('click', () => dialog?.showModal(), { signal })
    const template = root.querySelector('template'),
      target = root.querySelector('[data-cards]')
    if (template && target) {
      for (let i = 0; i < 3; i++) {
        const fragment = /** @type {DocumentFragment} */ (
          template.content.cloneNode(true)
        )
        const input = fragment.querySelector('input'),
          label = fragment.querySelector('label')
        if (input) input.id = 'title-' + i
        if (label) label.htmlFor = 'title-' + i
        target.append(fragment)
      }
    }
    measure()
  }
  apply.addEventListener('click', render, { signal })
  inspect.addEventListener('click', measure, { signal })
  width.addEventListener(
    'input',
    () => {
      host.style.width = width.value + 'px'
      measure()
    },
    { signal },
  )
  container.append(
    heading,
    note,
    html,
    css,
    apply,
    inspect,
    width,
    host,
    output,
  )
  render()
  return () => {
    controller.abort()
    document.documentElement.style.fontSize = originalRootSize
    shadow.replaceChildren()
    container.replaceChildren()
  }
}
