import React from "react";

import classes from "./UploadPage.module.scss";

import { AccountHeader } from "../../common/AccountHeader";

import { UploadSongForm } from "../../../../components/Forms/UploadSongForm";

export const UploadPage = () => {
  return (
    <div className={classes.settings}>
      <AccountHeader title={"Upload subpage"} />
      <section className={classes.uploadSong}>
        <UploadSongForm />
      </section>
    </div>
  );
};
