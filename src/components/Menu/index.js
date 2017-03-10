import React from 'react';
import { Link, scroll, scrollSpy } from 'react-scroll';

class Menu extends React.Component {
  componentDidMount() {
    scrollSpy.update();
  }
  scrollToTop() {
    scroll.scrollToTop();
  }
  scrollToBottom() {
    scroll.scrollToBottom();
  }
  scrollTo() {
    scroll.scrollTo(100);
  }
  scrollMore() {
    scroll.scrollMore(100);
  }
  render() {
    return (
      <div id="menu">
        <Link
          className="menu__item"
          to="about"g
          onSetActive={this.handleSetActive}
          spy
          smooth
          duration={500}
        >
          About
        </Link>

        <Link
          className="menu__item"
          to="tickets"
          onSetActive={this.handleSetActive}
          spy
          smooth
          duration={500}
        >
          Tickets
        </Link>

        <Link
          className="menu__item"
          to="sessions"
          onSetActive={this.handleSetActive}
          spy
          smooth
          duration={500}
        >
          Sessions
        </Link>

        <Link
          className="menu__item"
          to="sponsors"
          onSetActive={this.handleSetActive}
          spy
          smooth
          duration={500}
        >
          Sponsors
        </Link>

        <Link
          className="menu__item"
          to="venue"
          onSetActive={this.handleSetActive}
          spy
          smooth
          duration={500}
        >
          Venue
        </Link>

        <Link
          className="menu__item"
          to="news"
          onSetActive={this.handleSetActive}
          spy
          smooth
          duration={500}
        >
          News
        </Link>
      </div>
    );
  }
}

export default Menu;
