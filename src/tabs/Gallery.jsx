import { Component } from 'react';
import { Loader } from 'components';
import { Modal } from 'components/Modal/Modal';
import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    showBtn: false,
    isEmpty: false,
    images: [],
    currentPage: 1,
    value: '',
    isError: '',
    isLoading: false,
    largeImgURL: '',
  };

  componentDidUpdate(_, prevState) {
    const { value, currentPage } = this.state;

    if (value !== prevState.value || currentPage !== prevState.currentPage) {
      this.setState({ isLoading: true });
      ImageService.getImages(value, currentPage)
        .then(data => {
          if (!data.photos.length) {
            this.setState({ isEmpty: true });
            return;
          }

          this.setState(prevState => ({
            images: [...prevState.images, ...data.photos],
            showBtn: currentPage < Math.ceil(data.total_results / 15),
          }));
        })
        .catch(error => {
          this.setState({ isError: error.message });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  nextPage = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  handleSubmit = value => {
    this.setState({
      value,
      currentPage: 1,
      images: [],
      showBtn: false,
      isEmpty: false,
    });
  };

  showModal = link => {
    this.setState({ largeImgURL: link });
  };
  render() {
    const { isEmpty, images, showBtn, isError, isLoading, largeImgURL } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.handleSubmit} />
        <Grid>
          {images.map(({ id, avg_color, src, alt }) => {
            return (
              <GridItem key={id}>
                <CardItem color={avg_color}>
                  <img
                    src={src.large}
                    alt={alt}
                    onClick={() => {
                      this.showModal(src.large);
                    }}
                  />
                </CardItem>
              </GridItem>
            );
          })}
        </Grid>
        {isEmpty && <Text textAlign="center">Sorry. There are no images ... 😭</Text>}
        {isError && <Text textAlign="center">Sorry. {isError}😭</Text>}
        {showBtn && <Button onClick={this.nextPage}>Load more</Button>}
        {isLoading && <Loader />}
        {largeImgURL && <Modal largeImgURL={largeImgURL} closeModal={this.showModal} />}
      </>
    );
  }
}
