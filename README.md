# 仿掘金学习工程化

## 项目介绍
```
学习工程化，CI, CD，自动化部署等。
```

## 分支说明
```
1. develop：开发分支,显示最新开发状态;
2. master：主干分支,保持和生产环境一致；禁止push
3. feature-xxx：个人开发分支，可merge到develop分支；
4. bugfix-xxx：bug修复分支，可merge到develop分支；
```

## 部署示意图
无

## 项目结构
无

## 设置

### git 相关

```bash
# 代码提交 请使用 pnpm commit 进行git提交(强烈推荐)
pnpm commit

# 绕过 lint-staged 代码提交(强烈 不 推荐)
git commit --no-verify -m "你的消息"
```