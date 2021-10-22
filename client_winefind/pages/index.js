import styles from "../styles/Home.module.css";
import Head from "next/head";
import classNames from "classnames";
import LoginModal from "../components/LoginModal";

const Home = () => {
  return (
    <div className={styles.container}>
      <LoginModal />

      <div className={styles.intro_container}>
        <div className={styles.intro_message}>
          <div className={styles.intro_content}>
            <br />
            <br />
            <br />
            WIne FIne, and you?
            <br />
            <br />
            여러분의 와인지식, 안녕하신가요?
            <br />
            <br />
            누구나 와인을 쉽고 빠르게 배울 수 있습니다. <br />
            <br />
            간단한 테스트를 통해 인생 와인을 찾아드려요!
            <br />
            <br />
            WIne FInd와 함께라면, 여러분은 더이상 와린이가 아닙니다.
            <br />
            <br /> 바로 시작해보세요!
          </div>

          <div className={classNames(styles.logo_effect, styles.goToPosition)}>
            <div className={classNames(styles.box, styles.fade_in_box)}>WI</div>
            <div
              className={classNames(
                styles.box,
                styles.animated,
                styles.bounceInLeft
              )}
            >
              NE&nbsp;&nbsp;
            </div>
            <div className={classNames(styles.box, styles.fade_in_box)}>FI</div>
            <div
              className={classNames(
                styles.box,
                styles.animated,
                styles.bounceInLeft
              )}
            >
              ND
            </div>
          </div>
        </div>
        <div className={styles.right_image}>
          <img height="50%" src="images/Background3.jpg"></img>
        </div>
      </div>
      <div className={styles.learn_container}>
        <div className={styles.learn_intro}>
          <p>
            와인에 대해 알아보러 가볼까요? <br /> 와인의 역사, 와인의 종류, 가장
            인기가 많은 와인을
            <br /> 쉽게 알려드립니다! <br />
            <button>Learn Wine!</button>
          </p>
        </div>
        <div className={styles.learn_image}></div>
      </div>
      <div className={styles.learn_container}>
        <div className={styles.learn_image}></div>
        <div className={styles.learn_intro}>
          <p>
            당신에게 잘 맞는 와인은 무엇일까요?
            <br />
            지금 바로 와인 취향 테스트를 해보세요!
            <button>Test Start!</button>
          </p>
          <br />
        </div>
      </div>
    </div>
  );
};

export default Home;
