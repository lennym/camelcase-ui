const { Component, h } = require('preact');

class Footer extends Component {

  render() {
    return (
      <footer>
        <p>
          Icons by <a href="https://www.flaticon.com/authors/freepik">Freepik</a> and <a href="https://www.flaticon.com/authors/gregor-cresnar">Gregor Cresnar</a> from <a href="https://www.flaticon.com">www.flaticon.com</a>.
          <a href="/create-case">Create case</a>
        </p>
      </footer>
    );
  }

}

module.exports = Footer;
