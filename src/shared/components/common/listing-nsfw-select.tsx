import { randomStr } from "@utils/helpers";
import { Component, linkEvent } from "inferno";

import { I18NextService, UserService } from "../../services";

interface ListingNSFWSelectProps {
  value: boolean;
  onChange(val: boolean): void;
}

interface ListingNSFWSelectState {
  value: boolean;
}

export class ListingNSFWSelect extends Component<
  ListingNSFWSelectProps,
  ListingNSFWSelectState
> {
  private id = `listing-type-input-${randomStr()}`;

  state: ListingNSFWSelectState = {
    value: this.props.value,
  };

  constructor(props: any, context: any) {
    super(props, context);
  }

  static getDerivedStateFromProps(
    props: ListingNSFWSelectProps
  ): ListingNSFWSelectState {
    return {
      value: props.value,
    };
  }

  render() {
    return (
      <div className="listing-type-select btn-group btn-group-toggle flex-wrap">
        <label
          title={I18NextService.i18n.t("all_description")}
          className={`pointer btn btn-outline-secondary ${
            this.state.value == false && "active"
          }`}
        >
          <input
            id={`${this.id}-all`}
            type="radio"
            className="btn-check"
            value={"All"}
            checked={this.state.type_ == "All"}
            onChange={linkEvent(this, this.handleTypeChange)}
          />
          {I18NextService.i18n.t("button_hide_nsfw")}
        </label>

        <label
          title={I18NextService.i18n.t("subscribed_description")}
          className={`pointer btn btn-outline-secondary ${
            this.state.value == true && "active"
          }`}
        >
          <input
            id={`${this.id}-subscribed`}
            type="radio"
            className="btn-check"
            value={"Subscribed"}
            checked={this.state.value == true}
            onChange={linkEvent(this, this.handleTypeChange)}
            disabled={!UserService.Instance.myUserInfo}
          />
          {I18NextService.i18n.t("button_show_nsfw")}
        </label>
      </div>
    );
  }

  handleTypeChange(i: ListingNSFWSelect, event: any) {
    i.props.onChange(event.target.value);
  }
}
