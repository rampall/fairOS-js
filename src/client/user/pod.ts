import {
  PodClose,
  PodDelete,
  PodNew,
  PodOpen,
  PodPresent,
  PodReceiveInfo,
  PodReceive,
  PodShare,
  PodStat,
  PodSync,
  PodModel,
} from "../../internal";

export class UserPod extends PodModel {
  podReceiveInfo({ reference }: PodReceiveInfo) {
    return super.podReceiveInfo({ reference });
  }

  podReceive({ reference }: PodReceive) {
    return super.podReceive({ reference });
  }

  async podNew({ pod_name, password }: PodNew) {
    return super.podNew({
      pod_name,
      password,
    });
  }

  async podOpen({ pod_name, password }: PodOpen) {
    return super.podOpen({
      pod_name,
      password,
    });
  }

  podClose({ pod_name }: PodClose) {
    return super.podClose({
      pod_name,
    });
  }

  podSync({ pod_name }: PodSync) {
    return super.podSync({
      pod_name,
    });
  }

  podShare({ pod_name, password }: PodShare) {
    return super.podShare({
      pod_name,
      password,
    });
  }

  podDelete({ pod_name, password }: PodDelete) {
    return super.podDelete({
      pod_name,
      password,
    });
  }

  podList() {
    return super.podList();
  }

  podStat({ pod_name }: PodStat) {
    return super.podStat({
      pod_name,
    });
  }

  podPresent({ pod_name }: PodPresent) {
    return super.podPresent({
      pod_name,
    });
  }
}
