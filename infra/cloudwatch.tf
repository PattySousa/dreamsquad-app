resource "aws_cloudwatch_event_rule" "daily" {
  name                = "daily-task"
  schedule_expression = "rate(1 day)"
}

resource "aws_cloudwatch_event_target" "ecs_task" {
  rule      = aws_cloudwatch_event_rule.daily.name
  arn       = aws_ecs_cluster.backend.arn
  role_arn  = aws_iam_role.ecs_events_role.arn
  ecs_target {
    task_definition_arn = aws_ecs_task_definition.backend.arn
    launch_type        = "FARGATE"
    network_configuration {
      subnets         = [aws_subnet.public_a.id, aws_subnet.public_b.id]
      security_groups = [aws_security_group.backend_sg.id]
      assign_public_ip = true
    }
  }
}

# Role necessária para CloudWatch acionar ECS
resource "aws_iam_role" "ecs_events_role" {
  name = "ecs_events_role"
  assume_role_policy = data.aws_iam_policy_document.ecs_events_assume_role_policy.json
}

data "aws_iam_policy_document" "ecs_events_assume_role_policy" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type = "Service"
      identifiers = ["events.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy" "ecs_events_policy" {
  role = aws_iam_role.ecs_events_role.id
  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect = "Allow",
        Action = [
          "ecs:RunTask"
        ],
        Resource = "*"
      },
      {
        Effect = "Allow",
        Action = [
          "iam:PassRole"
        ],
        Resource = "*"
      }
    ]
  })
}
