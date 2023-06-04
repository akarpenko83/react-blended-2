import { Component } from 'react';
import { Overlay } from 'components/Overlay/Overlay.styled';
export class Modal extends Component {
  handleBackdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.closeModal('');
    }
  };
  componentDidMount() {
    window.addEventListener('keydown', this.escapeMethod);
  }
  escapeMethod = evt => {
    if (evt.code === 'Escape') {
      this.props.closeModal('');
    }
  };
  componentWillUnmount() {
    window.removeEventListener('keydown', this.escapeMethod);
  }
  render() {
    return (
      <Overlay onClick={this.handleBackdropClick}>
        <img src={this.props.largeImgURL} alt="name" style={{ width: '70%' }} />
      </Overlay>
    );
  }
}
