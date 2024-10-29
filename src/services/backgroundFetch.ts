import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import * as Notifications from "expo-notifications";
import ArticlesRepository from "../data/articles/ArticlesRepository";
import { Article } from "../types/ArticlesTypes";
import { sendLocalNotification } from "./notifications";
import { navigationRef } from "../navigators/TabNavigator";

const BACKGROUND_FETCH_TASK = "background-fetch-articles";
const NOTIFICATION_HANDLER_TASK = "notification-handler";

TaskManager.defineTask(NOTIFICATION_HANDLER_TASK, async () => {
  const subscription = Notifications.addNotificationResponseReceivedListener(
    (response: any) => {
      const url = response.notification.request.content.data.url;
      console.log(url);
      if (navigationRef.isReady()) {
        navigationRef.navigate("WebView", { url });
      }
    },
  );
  return () => {
    subscription.remove();
  };
});

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  try {
    const newArticles = await ArticlesRepository.fetchArticlesFromApi();
    const savedArticles = await ArticlesRepository.loadArticlesFromStorage();

    const unseenArticles = newArticles.filter(
      (article: Article) =>
        !savedArticles.some((a: Article) => a.storyId === article.storyId),
    );

    if (unseenArticles.length > 0) {
      const article = savedArticles[0];

      console.log(article);
      await sendLocalNotification({
        title: "Nuevo artículo disponible",
        body: article.title || article.storyTitle,
        data: { url: article.storyUrl || article.url },
      });

      await ArticlesRepository.saveArticlesToStorage(newArticles);
    }

    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    console.error(error);
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

export async function registerBackgroundTasks() {
  await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 15 * 60,
    stopOnTerminate: false,
    startOnBoot: true,
  });

  await BackgroundFetch.registerTaskAsync(NOTIFICATION_HANDLER_TASK, {
    stopOnTerminate: false,
    startOnBoot: true,
  });
}

export function unregisterBackgroundFetchTask() {
  BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}
