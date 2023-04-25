public class GitHubSyntaxHighlighting extends TextEditorHighlightingStyleProvider {
    private static final RGB MARKDOWN_BOLD_COLOR = new RGB(255, 0, 0);
    private static final RGB MARKDOWN_ITALIC_COLOR = new RGB(0, 255, 0);
    private static final RGB MARKDOWN_LINK_COLOR = new RGB(0, 0, 255);
    private static final RGB MARKDOWN_IMAGE_COLOR = new RGB(255, 255, 0);

    @Override
    public void init(IColorManager colorManager) {
        colorManager.bindColor(GitHubCodeCompletionPlugin.getPluginId() + ".markdown.bold", MARKDOWN_BOLD_COLOR);
        colorManager.bindColor(GitHubCodeCompletionPlugin.getPluginId() + ".markdown.italic", MARKDOWN_ITALIC_COLOR);
        colorManager.bindColor(GitHubCodeCompletionPlugin.getPluginId() + ".markdown.link", MARKDOWN_LINK_COLOR);
        colorManager.bindColor(GitHubCodeCompletionPlugin.getPluginId() + ".markdown.image", MARKDOWN_IMAGE_COLOR);
    }
}